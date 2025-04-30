export const wrapContent = ({content, title}) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="icon" href="data:image/x-icon;base64,AA" />
            <script async defer src="./bundle.js"></script>
            <title>${title}</title>
        </head>
        <body>
            <div id="root">
                ${content}
            </div>
        </body>
    </html>
`