import { useState, useEffect, useRef } from 'react';
import {
    CssBaseline,
    ThemeProvider,
    createTheme,
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    CircularProgress,
    Alert,
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { initialHtmlTemplate } from './data/initialTemplate';
import { initialJsonData } from './data/initialJson';
import VanillaJsonEditor  from './components/VanillaJsonEditor';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const JsonTableView = ({ jsonData }) => {
    let data;
    try {
        data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    } catch (e) {
        return <Alert severity="error">Invalid JSON data. Please correct it in the JSON Data tab to see the table view.</Alert>;
    }

    if (!Array.isArray(data)) {
        return <Alert severity="info">Table view only supports a JSON array of objects.</Alert>;
    }

    if (data.length === 0) {
        return <Alert severity="info">The JSON array is empty.</Alert>;
    }

    // Check if the first object has the required keys for the table.
    if (!('Application_No' in data[0] && 'request_ids' in data[0])) {
            return <Alert severity="warning">To display the table, the JSON data must be an array of objects, with each object containing 'Application_No' and 'request_ids' keys.</Alert>;
    }

    return (
        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="json data table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Application No</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Request Ids</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={row.Application_No || index}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.Application_No}
                            </TableCell>
                            <TableCell>{Array.isArray(row.request_ids) ? row.request_ids.join(', ') : ''}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

function App() {
    const [htmlTemplate, setHtmlTemplate] = useState(initialHtmlTemplate);
    const [jsonData, setJsonData] = useState(initialJsonData);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const debounceTimeout = useRef(null);

    useEffect(() => { // Main PDF Generation Effect
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const generatePdf = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    // jsonData is now an object, no need to parse before sending.
                    const response = await fetch('http://localhost:4000/api/generate-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ htmlTemplate, jsonData }),
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Server error: ${response.status} - ${errorText}`);
                    }

                    const blob = await response.blob();
                    setPdfUrl(currentUrl => {
                        if (currentUrl) URL.revokeObjectURL(currentUrl);
                        return URL.createObjectURL(blob);
                    });
                } catch (err) {
                    console.error('Failed to generate PDF', err);
                    setError(err.message);
                    setPdfUrl(currentUrl => {
                        if (currentUrl) URL.revokeObjectURL(currentUrl);
                        return null;
                    });
                } finally {
                    setIsLoading(false);
                }
            };
            generatePdf();
        }, 500); // 500ms debounce

    }, [htmlTemplate, jsonData]); // Rerun effect when template or data changes

    useEffect(() => { // Cleanup effect for PDF URL
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        }
    }, [pdfUrl]);

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <DescriptionIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" noWrap>
                        CSEL LOS Live PDF Template Editor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container sx={{ flexGrow: 1, height: '100%', overflow:'hidden' }}>
                {/* Editor Panel */}
                <Grid item xs={12} md={6} sx={{ p: 2,height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={currentTab} onChange={handleTabChange} aria-label="Editor tabs">
                                <Tab label="HTML Editor" {...a11yProps(0)} />
                                <Tab label="JSON Data" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        {currentTab === 0 && (
                            <Box role="tabpanel" id="simple-tabpanel-0" aria-labelledby="simple-tab-0" sx={{ p: 2, flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                   id="html-template"
                                   multiline
                                   value={htmlTemplate}
                                   onChange={(e) => setHtmlTemplate(e.target.value)}
                                   variant="outlined"
                                   fullWidth
                                   sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' } }}
                                />
                            </Box>
                        )}
                        {currentTab === 1 && (
                            <Box role="tabpanel" id="simple-tabpanel-1" aria-labelledby="simple-tab-1" sx={{ p: 2, flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <VanillaJsonEditor
                                    content={jsonData}
                                    onChange={setJsonData}
                                />
                            </Box>
                        )}
                        
                    </Paper>
                </Grid>

                {/* Preview Panel */}
                <Grid item xs={12} md={6} sx={{ p: 2,height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Paper elevation={3} sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                        <Typography variant="h5" gutterBottom>Live PDF Preview</Typography>
                        <Box sx={{ flexGrow: 1, border: '1px dashed grey', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p:1, overflow: 'auto' }}>
                            {isLoading && <CircularProgress />}
                            {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
                            {!isLoading && !error && pdfUrl && (
                                <iframe src={pdfUrl} title="PDF Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
                            )}
                            {!isLoading && !error && !pdfUrl && <Alert severity="info" sx={{ width: '100%' }}>Could not display PDF.</Alert>}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </ThemeProvider>
  );
}

export default App;
