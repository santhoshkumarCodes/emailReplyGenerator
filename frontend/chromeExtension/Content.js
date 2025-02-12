
console.log("chromeExtensionContent");

const observor = new MutationObserver((mutations) => {
    for(let mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        if(hasComposElements) {
            console.log("hasComposElements");
            setTimeout(injectButton, 500);
        }
    }
});

function injectButton() {
    const existingButton = document.querySelector('.reply-button');
    if(existingButton) {
        existingButton.remove();
    }

    const toolbar = findToolbar();
    if(!toolbar) {
        console.log("toolbar not found");
        return;
    }

    console.log("toolbar found");
    const button = createButton();
    button.classList.add('reply-button');
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const tone = "professional";
            const response = await fetch('https://replygenerator.onrender.com/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "emailContent" : emailContent,
                    "tome" : tone
                })
            });

            if(!response.ok) {
                throw new Error("Could not generate email reply");
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Reply could not be found.');
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate reply");
        } finally {
            button.innerHTML = 'Generate Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '[role="presentation"]'];
    for(const selector of selectors) {
        const content = document.querySelector(selector);
        if(content) {
            return content.innerText.trim();
        }
    }
    return null;
}

function createButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.innerHTML = 'Generate Reply';
    button.style.marginRight = '16px';
    button.style.borderRadius = '1rem';
    button.style.width = '10rem';
    button.style.backgroundColor = '#0b57d0';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI powered reply');
    return button;
}

function findToolbar() {
    const selectors = ['.btC', '.aDh', '[role="toolbar"]'];
    for(const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if(toolbar) {
            return toolbar;
        }
    }
    return null;
}

observor.observe(document.body, { childList: true, subtree: true });