export const initialHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sanction Letter</title>
</head>
<body style="
      font-family: {{#ifEquals (uppercase preferredLang) 'GUJARATI'}} 'Noto Sans Gujarati',{{/ifEquals}}{{#ifEquals (uppercase preferredLang) 'MARATHI'}} 'Noto Sans Devanagari',{{/ifEquals}} Calibri, sans-serif;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
      margin: 30px;
      page-break-after: always;
      -webkit-print-color-adjust: exact;
      @page {
        margin-top: 5cm;
        margin-left: 2cm;
        margin-bottom: 2cm;
        margin-right: 2cm;
      }
    ">
    <table style=" border-collapse: collapse; width: 100%" cellpadding="10">
        <tr>
            <td style="border-collapse: collapse;text-align: center;font-size: 14px;">
                <b>{{heading.1.value}} – {{type_of_loan}}</b>
            </td>
            <td style="border-collapse: collapse;text-align: right;font-size: 13px;">
                {{heading.2.value}}
                <br />{{heading.3.value}}: {{date_of_agreement}}
                <br />{{heading.4.value}}:{{Place}}
            </td>
        </tr>
    </table>
    <div style="margin: 15px 0 20px 0">
        <p style="font-size: 16px; margin: 0 0 3px 0; font-weight: 600">
            {{companyAddress.1.value}},
        </p>
        <span style="font-size: 13px"> {{companyAddress.2.value}}, <br>
      {{companyAddress.3.value}},<br>
      {{companyAddress.4.value}},<br> {{companyAddress.5.value}}. <br>
      {{companyAddress.6.value}}.</span>
    </div>
    <div style="display: flex;justify-content: space-between;font-size: 13px;align-items: flex-start;">
        <table style="width: 100%; margin-top: 30px">
            <tbody>
                <tr>
                    <td valign="top" style="height: 15px">{{to.title.value}}:</td>
                </tr>
                <tr>
                    <td>{{to.borrower.1.name.value}}: {{name_of_borrower}}</td>
                    <td>{{to.coBorrower.1.name.value}}: {{name_of_coborrower1}}</td>
                </tr>
                <tr>
                    <td>{{to.borrower.1.address.value}}: {{address_of_borrower}}</td>
                    <td>{{to.coBorrower.1.address.value}}: {{address_of_coborrower1}}</td>
                </tr>
                <tr>
                    <td valign="top" style="height: 30px"></td>
                </tr>
                <tr>
                    <td>{{to.coBorrower.2.name.value}}: {{name_of_coborrower2}}</td>
                    <td>C{{to.coBorrower.3.name.value}}: {{name_of_coborrower3}}</td>
                </tr>
                <tr>
                    <td>{{to.coBorrower.2.address.value}}: {{address_of_coborrower2}}</td>
                    <td>{{to.coBorrower.2.address.value}}: {{address_of_coborrower3}}</td>
                </tr>
                <tr>
                    <td valign="top" style="height: 30px"></td>
                </tr>
                <tr>
                    <td>{{to.coBorrower.4.name.value}}: {{name_of_coborrower4}}</td>
                    <td>{{to.coBorrower.5.name.value}}: {{name_of_coborrower5}}</td>
                </tr>
                <tr>
                    <td>{{to.coBorrower.4.address.value}}: {{address_of_coborrower4}}</td>
                    <td>{{to.coBorrower.5.address.value}}: {{address_of_coborrower5}}</td>
                </tr>
                <tr>
                    <td valign="top" style="height: 30px"></td>
                </tr>
                <tr>
                    <td>{{to.guarantor.1.name.value}}: {{name_of_guarantor}}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>{{to.guarantor.1.address.value}}: {{Address_of_guarantor}}</td>
                    <td></td>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p style="font-size: 14px">
        {{table.above.value}}
    </p>
    <table style="border: 1px solid black;border-collapse: collapse;font-size: 14px;width: 100%;" cellpadding="5">
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.1.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{loan_type}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.2.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{loan_purpose}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.3.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{sanctioned_amount}}</td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.4.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">{{tenor}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.5.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">{{tenor}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.6.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.answer.1.value}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.7.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">{{roi}}% {table.list.answer.4.value}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.8.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">{{emi}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.9.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.answer.2.value}}
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.10.value}}
            </td>
            <td style="border: 1px solid black; border-collapse: collapse">
                {{table.list.answer.3.value}}
            </td>
        </tr>
    </table>
    <div style="page-break-after: always">
        <p style="font-size: 12px; ">
            {{note.1.value}}
        </p>
        <p> {{note.2.value}}</p>
        <p style="font-size: 15px; font-weight: 600; margin: 0">
            {{terms.title.value}}
        </p>
        <ol style="font-size: 13px; text-align: justify; margin: 0">
            <li>
                {{terms.1.value}}
            </li>
            <li>
                {{terms.2.a.value}}
                <table style="border: 1px solid black;border-collapse: collapse;margin: 10px 0;width: 100%;" cellpadding="4">
                            <tr style="background-color: #001f5f; color: white">
                                <th style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.heading.1.value}}
                                </th>
                                <th style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.heading.2.value}}
                                </th>
                                <th style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.heading.3.value}}
                                </th>
                                <th style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.heading.4.value}}
                                </th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.list.1.value}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{cipac_sum_assured}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{cipac_premium}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.list.2.value}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.list.3.value}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.list.4.value}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{lic_sum_assured}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{lic_premium}}
                                </td>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    {{terms.2.b.list.5.value}}
                                </td>
                                 <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                 <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                                 <td style="border: 1px solid black;border-collapse: collapse;text-align: center;">
                                    --
                                </td>
                            </tr>
                        </table>
                    </li>
                    <li>
                        {{terms.3.value}}
                    </li>
                    <li>
                        <b> {{terms.4.value}}
                </b>
                    </li>
                    <li>
                        {{terms.5.value}}
                    </li>
                    <li>
                        {{terms.6.value}}
                    </li>
                    <li>
                        {{terms.7.value}}
                    </li>
                    <li>
                        {{terms.8.value}}
                    </li>
                    <li>
                        {{terms.8.value}}
                    </li>
                    <li>
                        {{terms.10.value}}
                    </li>
                    <li>
                        {{terms.11.value}}
                    </li>
                    <li>
                        {{terms.12.value}}
                    </li>
                    <li>
                        {{terms.13.value}}
                    </li>
                    <li>
                        {{terms.14.value}}
                    </li>
                    <li>
                        {{terms.15.value}}
                    </li>
                    <li>
                        {{terms.16.value}}
                    </li>
                    <li>
                        {{terms.17.value}}
                    </li>
                    <li>
                        {{terms.18.value}}
                    </li>
                    <li>
                        {{terms.19.value}}
                    </li>
                    <li>
                        {{terms.20.value}}
                    </li>
                    <li>
                        {{terms.21.value}}
                    </li>
                    <li>
                        {{terms.22.value}}
                    </li>
                </ol>
                <p style="font-size: 14px; margin: 0">{{footer.1.value}},</p>
                <p>{{footer.2.value}}</p>
                <p><b>{{footer.3.value}}</b></p>
            </div>
        </body>
        </html>
`;