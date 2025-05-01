export const wrapContent = ({content, title}) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <link rel="icon" href="data:image/x-icon;base64,AA" />
            <script async defer src="./bundle.js"></script>
            <title>${title}</title>
            <script src="https://cdn.tailwindcss.com"></script>

            <script>
                tailwind.config = {
                    theme: {
                    extend: {
                        colors: {
                        primary: '#1e40af',
                        }
                    }
                    }
                }
            </script>
        </head>
        <body>
            <div id="root">
                ${content}
            </div>
        </body>
    </html>
`