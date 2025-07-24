import { useEffect, useRef } from 'react';
import { JSONEditor } from 'vanilla-jsoneditor';
import 'vanilla-jsoneditor/themes/jse-theme-dark.css';

const VanillaJsonEditor = ({ content, onChange }) => {
    const editorRef = useRef(null);
    const containerRef = useRef(null);

    // Initialize editor
    useEffect(() => {
        if (containerRef.current && !editorRef.current) {
            editorRef.current = new JSONEditor({
                target: containerRef.current,
                props: {
                    content: {
                        json: content
                    },
                    onChange: (updatedContent, previousContent, { contentErrors }) => {
                        // The `onChange` callback is only triggered by user interaction.
                        // We can use `contentErrors` to check for invalid JSON in 'code' or 'text' mode.
                        if (contentErrors) {
                            console.error('Errors in JSON, not updating state:', contentErrors);
                            return;
                        }

                        // The updated content can be in two formats: json or text.
                        // We check for the `json` property, which is available when the content is valid.
                        if (updatedContent.json !== undefined) {
                            onChange(updatedContent.json);
                        }
                    },
                    mainMenuBar: true,
                    mode: 'tree' // Other modes: 'code', 'text', 'preview'
                }
            });
        }

        // Cleanup on unmount
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once

    // Update editor content when the `content` prop changes from outside
    useEffect(() => {
        editorRef.current?.update({ json: content });
    }, [content]);

    return <div ref={containerRef} style={{ height: '100%' }} />;
};

export default VanillaJsonEditor;