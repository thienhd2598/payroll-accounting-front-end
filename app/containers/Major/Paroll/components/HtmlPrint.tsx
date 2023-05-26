import React, { useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';

const HtmlPrint = ({ isShowPrint, onHide }) => {
    const componentRef = React.useRef() as any;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        if (isShowPrint) {
            handlePrint();
            onHide();            
        }
    }, [isShowPrint]);
    return (
        <>
            <div>
                <div style={{ display: 'none' }}>
                    <div ref={componentRef} dangerouslySetInnerHTML={{ __html: templateHtml({ name: 'Thiện' }) }} />
                </div>
            </div>
        </>
    );
};

export default HtmlPrint;


const templateHtml = ({ name }) => {
    return `
    <html>

    <head>
        <meta content="text/html; charset=UTF-8" http-equiv="content-type">
        <style type="text/css">
            ol {
                margin: 0;
                padding: 0
            }

            table td,
            table th {
                padding: 0
            }

            .c40 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 42pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c22 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 25.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c8 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 37.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c15 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 287.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c25 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 55.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c37 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 42.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c41 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 159.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c27 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 78.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c12 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 38.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c28 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 283.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c30 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 118.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c48 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 61.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c44 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 70.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c23 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 33.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c43 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 29.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c16 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 35.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c31 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 36.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c36 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 48.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c11 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 214.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c29 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 231pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c6 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 0pt;
                border-right-width: 0pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 0pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 0pt;
                width: 192.8pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c38 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 54pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c32 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 68.2pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c26 {
                border-right-style: solid;
                padding: 5pt 5pt 5pt 5pt;
                border-bottom-color: #000000;
                border-top-width: 1pt;
                border-right-width: 1pt;
                border-left-color: #000000;
                vertical-align: top;
                border-right-color: #000000;
                border-left-width: 1pt;
                border-top-style: solid;
                border-left-style: solid;
                border-bottom-width: 1pt;
                width: 52.5pt;
                border-top-color: #000000;
                border-bottom-style: solid
            }

            .c19 {
                color: #000000;
                font-weight: 400;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 8pt;
                font-family: "Times New Roman";
                font-style: italic
            }

            .c21 {
                color: #000000;
                font-weight: 400;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 10pt;
                font-family: "Times New Roman";
                font-style: italic
            }

            .c47 {
                color: #000000;
                font-weight: 700;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 10pt;
                font-family: "Times New Roman";
                font-style: normal
            }

            .c4 {
                color: #000000;
                font-weight: 400;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 8pt;
                font-family: "Times New Roman";
                font-style: normal
            }

            .c2 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.15;
                orphans: 2;
                widows: 2;
                text-align: left;
                height: 11pt
            }

            .c13 {
                color: #000000;
                font-weight: 700;
                text-decoration: none;
                vertical-align: baseline;
                font-size: 8pt;
                font-family: "Times New Roman";
                font-style: normal
            }

            .c10 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.15;
                orphans: 2;
                widows: 2;
                text-align: center
            }

            .c24 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.15;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            .c0 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.15;
                orphans: 2;
                widows: 2;
                text-align: justify
            }

            .c7 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left;
                height: 11pt
            }

            .c46 {
                margin-left: auto;
                border-spacing: 0;
                border-collapse: collapse;
                margin-right: auto
            }

            .c14 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: center
            }

            .c34 {
                font-size: 8pt;
                font-family: "Times New Roman";
                font-style: italic;
                font-weight: 400
            }

            .c5 {
                border-spacing: 0;
                border-collapse: collapse;
                margin-right: auto
            }

            .c45 {
                padding-top: 0pt;
                padding-bottom: 0pt;
                line-height: 1.0;
                text-align: left
            }

            .c1 {
                background-color: #ffffff;
                max-width: 697.9pt;
                padding: 72pt 72pt 72pt 72pt
            }

            .c39 {
                margin-left: 36pt;
                text-indent: 36pt
            }

            .c49 {
                height: 49.5pt
            }

            .c9 {
                height: 3.1pt
            }

            .c20 {
                height: 18.8pt
            }

            .c3 {
                height: 25pt
            }

            .c35 {
                height: 23.9pt
            }

            .c42 {
                height: 21pt
            }

            .c17 {
                height: 11pt
            }

            .c50 {
                margin-right: -40pt
            }

            .c18 {
                height: 25.5pt
            }

            .c33 {
                height: 18pt
            }

            .title {
                padding-top: 0pt;
                color: #000000;
                font-size: 26pt;
                padding-bottom: 3pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            .subtitle {
                padding-top: 0pt;
                color: #666666;
                font-size: 15pt;
                padding-bottom: 16pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            li {
                color: #000000;
                font-size: 11pt;
                font-family: "Arial"
            }

            p {
                margin: 0;
                color: #000000;
                font-size: 11pt;
                font-family: "Arial"
            }

            h1 {
                padding-top: 20pt;
                color: #000000;
                font-size: 20pt;
                padding-bottom: 6pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            h2 {
                padding-top: 18pt;
                color: #000000;
                font-size: 16pt;
                padding-bottom: 6pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            h3 {
                padding-top: 16pt;
                color: #434343;
                font-size: 14pt;
                padding-bottom: 4pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            h4 {
                padding-top: 14pt;
                color: #666666;
                font-size: 12pt;
                padding-bottom: 4pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            h5 {
                padding-top: 12pt;
                color: #666666;
                font-size: 11pt;
                padding-bottom: 4pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                orphans: 2;
                widows: 2;
                text-align: left
            }

            h6 {
                padding-top: 12pt;
                color: #666666;
                font-size: 11pt;
                padding-bottom: 4pt;
                font-family: "Arial";
                line-height: 1.15;
                page-break-after: avoid;
                font-style: italic;
                orphans: 2;
                widows: 2;
                text-align: left
            }
        </style>
    </head>

    <body class="c1 doc-content">
        <p class="c2"><span class="c4"></span></p><a id="t.257587456b47cc132a09f413a4072785b69e1ff0"></a><a id="t.0"></a>
        <table class="c5">
            <tr class="c35">
                <td class="c41" colspan="1" rowspan="1">
                    <p class="c0 c50"><span class="c13">&#272;&#417;n v&#7883;: C&ocirc;ng ty c&#7893; ph&#7847;n c&ocirc;ng
                            ngh&#7879; UPBASE </span></p>
                </td>
                <td class="c29" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c28" colspan="1" rowspan="1">
                    <p class="c10"><span class="c13">M&#7851;u s&#7889;: 02- L&#272;TL</span></p>
                </td>
            </tr>
            <tr class="c42">
                <td class="c41" colspan="1" rowspan="1">
                    <p class="c0"><span class="c13">B&#7897; ph&#7853;n: H&agrave;nh ch&iacute;nh nh&acirc;n s&#7921;</span>
                    </p>
                </td>
                <td class="c29" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c28" colspan="1" rowspan="1">
                    <p class="c10"><span class="c4">(Ban h&agrave;nh theo Th&ocirc;ng t&#432; s&#7889;
                            200/2014/TT-BTC</span></p>
                </td>
            </tr>
            <tr class="c20">
                <td class="c41" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c29" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c28" colspan="1" rowspan="1">
                    <p class="c24"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ng&agrave;y
                            22/12/2014 c&#7911;a B&#7897; T&agrave;i ch&iacute;nh)</span></p>
                </td>
            </tr>
            <tr class="c9">
                <td class="c41" colspan="1" rowspan="1">
                    <p class="c0 c17"><span class="c4"></span></p>
                </td>
                <td class="c29" colspan="1" rowspan="1">
                    <p class="c0 c17"><span class="c4"></span></p>
                </td>
                <td class="c28" colspan="1" rowspan="1">
                    <p class="c24"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            S&#7889;:...............</span></p>
                    <p class="c2"><span class="c4"></span></p>
                </td>
            </tr>
        </table>
        <p class="c24"><span class="c4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </p>
        <p class="c2"><span class="c4"></span></p>
        <p class="c10"><span class="c47">B&#7842;NG THANH TO&Aacute;N TI&#7872;N L&#431;&#416;NG UPBASE</span></p>
        <p class="c10"><span class="c4">Th&aacute;ng 10 n&#259;m 2023</span></p>
        <p class="c10 c17"><span class="c4"></span></p><a id="t.068cc87ac0897604c600372f9cc337e203b63850"></a><a
            id="t.1"></a>
        <table class="c46">
            <tr class="c33">
                <td class="c22" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">STT</span></p>
                </td>
                <td class="c32" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">T&ecirc;n nh&acirc;n vi&ecirc;n </span></p>
                </td>
                <td class="c43" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">S&#7889; c&ocirc;ng</span></p>
                </td>
                <td class="c38" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">L&#432;&#417;ng c&#417; b&#7843;n </span></p>
                </td>
                <td class="c23" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">Ng&agrave;y ngh&#7881; l&#7877;, ph&eacute;p</span></p>
                </td>
                <td class="c44" colspan="2" rowspan="1">
                    <p class="c14"><span class="c4">Gi&#7901; l&agrave;m th&ecirc;m </span></p>
                </td>
                <td class="c25" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">Ph&#7909; c&#7845;p </span></p>
                </td>
                <td class="c26" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">T&#7893;ng ti&#7873;n l&agrave;m th&ecirc;m </span></p>
                </td>
                <td class="c30" colspan="3" rowspan="1">
                    <p class="c14"><span class="c4">Kh&#7845;u tr&#7915; </span></p>
                </td>
                <td class="c36" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">Kh&#7845;u tr&#7915; TNCN</span></p>
                </td>
                <td class="c27" colspan="2" rowspan="1">
                    <p class="c14"><span class="c4">T&#7841;m &#7913;ng</span></p>
                </td>
                <td class="c48" colspan="1" rowspan="2">
                    <p class="c14"><span class="c4">Th&#7921;c l&#297;nh </span></p>
                </td>
            </tr>
            <tr class="c33">
                <td class="c16" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">Ng&agrave;y th&#432;&#7903;ng</span></p>
                </td>
                <td class="c16" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">Ng&agrave;y l&#7877; </span></p>
                </td>
                <td class="c37" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">BHXH</span></p>
                </td>
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">BHYT</span></p>
                </td>
                <td class="c8" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">BHTN</span></p>
                </td>
                <td class="c40" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">N&#7907; TK334</span></p>
                </td>
                <td class="c31" colspan="1" rowspan="1">
                    <p class="c14"><span class="c4">C&oacute; </span></p>
                    <p class="c14"><span class="c4">TK141</span></p>
                </td>
            </tr>
            <tr class="c49">
                <td class="c22" colspan="1" rowspan="1">
                    <p class="c45"><span class="c4">1</span></p>
                </td>
                <td class="c32" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"> ${name} </span></p>
                </td>
                <td class="c43" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c38" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c23" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c16" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c16" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c25" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c26" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c37" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c12" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c8" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c36" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c40" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c31" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
                <td class="c48" colspan="1" rowspan="1">
                    <p class="c7"><span class="c4"></span></p>
                </td>
            </tr>
        </table>
        <p class="c10 c17"><span class="c4"></span></p>
        <p class="c0 c17"><span class="c4"></span></p>
        <p class="c0 c39"><span class="c4">T&#7893;ng s&#7889; ti&#7873;n (vi&#7871;t b&#7857;ng
                ch&#7919;):...................................................................................</span></p><a
            id="t.fd2db63af81b02a0f1edda1941164b11ddab8ac6"></a><a id="t.2"></a>
        <table class="c5">
            <tr class="c18">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c0"><span class="c4">&nbsp;</span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10"><span class="c19">Ng&agrave;y 10 &nbsp;th&aacute;ng 10 n&#259;m 2023.</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c10"><span class="c13">Ng&#432;&#7901;i l&#7853;p bi&#7875;u</span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c10"><span class="c13">K&#7871; to&aacute;n tr&#432;&#7903;ng</span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10"><span class="c13">Gi&aacute;m &#273;&#7889;c</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c24"><span class="c19">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Tr&#7847;n Ph&#432;&#417;ng Linh</span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c24"><span class="c19">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Tr&#7883;nh Thu Quy&ecirc;n </span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10"><span class="c34">&#272;&#7895; V&#259;n Giang</span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c2"><span class="c19"></span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c2"><span class="c19"></span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
            </tr>
            <tr class="c3">
                <td class="c15" colspan="1" rowspan="1">
                    <p class="c2"><span class="c19"></span></p>
                </td>
                <td class="c6" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
                <td class="c11" colspan="1" rowspan="1">
                    <p class="c10 c17"><span class="c19"></span></p>
                </td>
            </tr>
        </table>
        <p class="c24"><span class="c4">&nbsp;</span></p>
        <p class="c2"><span class="c4"></span></p>
        <p class="c24"><span class="c4">&nbsp;</span></p>
        <p class="c2"><span class="c4"></span></p>
    </body>

    </html>
    `
}