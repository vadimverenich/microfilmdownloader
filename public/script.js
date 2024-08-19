document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById("numberInput");
    const generateXmlButton = document.getElementById("generateXmlButton");
    const generatedLinksContainer = document.getElementById("generatedLinks");

    generateXmlButton.addEventListener("click", async () => {
        const number = numberInput.value;
        const response = await fetch('/generate-links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number })
        });

        const data = await response.json();
        const links = data.links;
        let linksHtml = "";

        links.forEach(link => {
            linksHtml += `<a href="${link.linkUrl}" download="${link.name}.jpg">${link.name}</a><br>`;
        });

        generatedLinksContainer.innerHTML = linksHtml;
    });
});