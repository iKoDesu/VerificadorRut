// DOM Elements
const rutInput = document.getElementById('rut-input');
const calcInput = document.getElementById('calc-input');
const verifyResult = document.getElementById('verify-result');
const calcResult = document.getElementById('calc-result');
const clearVerifyBtn = document.getElementById('clear-verify-btn');
const clearCalcBtn = document.getElementById('clear-calc-btn');

// Switch Tab Logic
function switchTab(tab) {
    // Update Tab Buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    // Update Panes
    document.querySelectorAll('.pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(`pane-${tab}`).classList.add('active');

    // Focus input and reset state
    if (tab === 'verify') {
        rutInput.focus();
        validateVerifyInput();
    } else {
        calcInput.focus();
        validateCalcInput();
    }
}

// Clean RUT: Remove dots, hyphens, spaces, and keep body & check digit
function cleanRut(rut) {
    if (!rut) return '';
    // Remove everything except numbers and K/k
    return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

// Calculate the Check Digit (Dígito Verificador)
function calculateDV(rutBody) {
    if (!rutBody || !/^\d+$/.test(rutBody)) return null;
    
    let sum = 0;
    let multiplier = 2;
    
    // Reverse the body digits and calculate the weighted sum
    for (let i = rutBody.length - 1; i >= 0; i--) {
        sum += parseInt(rutBody.charAt(i), 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    const result = 11 - remainder;
    
    if (result === 11) return '0';
    if (result === 10) return 'K';
    return result.toString();
}

// Format numbers as Chilean currency/RUT format (with dots)
function formatNumberWithDots(numberString) {
    if (!numberString) return '';
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Format a complete RUT body + DV
function formatCompleteRut(rutBody, dv) {
    const formattedBody = formatNumberWithDots(rutBody);
    return dv ? `${formattedBody}-${dv}` : formattedBody;
}

// Validation logic for Verify Mode
function validateVerifyInput() {
    const rawVal = rutInput.value;
    
    // Toggle clear button
    if (rawVal.length > 0) {
        clearVerifyBtn.classList.add('visible');
    } else {
        clearVerifyBtn.classList.remove('visible');
    }

    const cleaned = cleanRut(rawVal);
    
    // If empty
    if (!cleaned) {
        verifyResult.className = 'result-box';
        verifyResult.innerHTML = `
            <div class="result-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-fingerprint"><path d="M2 12a10 10 0 0 1 13-9.54"/><path d="M8 20A8 8 0 0 1 4 12"/><path d="M5 20a6 6 0 0 1 3-9.54"/><path d="M12 2a10 10 0 0 1 10 10v0a8 8 0 0 1-5 7.4"/><path d="M15 20a6 6 0 0 1-3-9.54"/><path d="M19 12a6 6 0 0 0-6-6"/><path d="M12 14v4"/><path d="M16 14v2"/></svg>
                <p>Escribe un RUT para verificar su validez</p>
            </div>
        `;
        return;
    }

    // If typing but incomplete (Chilean RUTs have 7 or 8 digits for the body, plus 1 DV)
    // Cleaned length should be at least 8 to start validating as valid/invalid
    // (Minimum RUT is around 1.000.000-3, which is 7 digits + 1 DV = 8 chars)
    if (cleaned.length < 7) {
        verifyResult.className = 'result-box';
        verifyResult.innerHTML = `
            <div class="result-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <p>Sigue escribiendo... (RUT demasiado corto)</p>
            </div>
        `;
        return;
    }

    const body = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);
    const expectedDV = calculateDV(body);
    const isValid = expectedDV === dv;
    const formatted = formatCompleteRut(body, dv);

    if (isValid) {
        verifyResult.className = 'result-box valid';
        verifyResult.innerHTML = `
            <div class="result-card">
                <div class="result-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="result-info">
                    <div class="result-status">RUT Válido</div>
                    <div class="result-details">${formatted}</div>
                    
                    <div class="copy-actions-container">
                        <span class="copy-label">Copiar formato:</span>
                        <div class="copy-buttons-row">
                            <button class="copy-btn-mini" onclick="copyToClipboard('${formatted}', this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                <span>${formatted}</span>
                            </button>
                            <button class="copy-btn-mini" onclick="copyToClipboard('${body}-${dv}', this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                <span>${body}-${dv}</span>
                            </button>
                            <button class="copy-btn-mini" onclick="copyToClipboard('${body}${dv}', this)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                <span>${body}${dv}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        verifyResult.className = 'result-box invalid';
        
        let detailsText = `El dígito verificador ingresado (${dv}) no corresponde.`;
        if (expectedDV) {
            detailsText = `Debería terminar en -${expectedDV} en vez de -${dv}.`;
        }
        
        verifyResult.innerHTML = `
            <div class="result-card">
                <div class="result-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="result-info">
                    <div class="result-status">RUT Inválido</div>
                    <div class="result-details">${detailsText}</div>
                </div>
            </div>
        `;
    }
}

// Logic for Calculate Mode
function validateCalcInput() {
    let rawVal = calcInput.value;
    
    // Remove non-numeric characters for calculation input
    const cleanNumbersOnly = rawVal.replace(/\D/g, '');
    
    // Format input box live with dots
    if (cleanNumbersOnly !== rawVal.replace(/\./g, '')) {
        // Only update if it actually changed to prevent cursor jumps when typing letters
        const formattedInput = formatNumberWithDots(cleanNumbersOnly);
        calcInput.value = formattedInput;
    }
    
    // Toggle clear button
    if (cleanNumbersOnly.length > 0) {
        clearCalcBtn.classList.add('visible');
    } else {
        clearCalcBtn.classList.remove('visible');
    }

    // If empty
    if (!cleanNumbersOnly) {
        calcResult.className = 'result-box';
        calcResult.innerHTML = `
            <div class="result-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p>Escribe los números del RUT para calcular su DV</p>
            </div>
        `;
        return;
    }

    const dv = calculateDV(cleanNumbersOnly);
    const fullRut = formatCompleteRut(cleanNumbersOnly, dv);

    if (dv !== null) {
        calcResult.className = 'result-box valid'; // green borders look nice for calculated RUTs too!
        calcResult.innerHTML = `
            <div class="calc-result-layout">
                <div class="calc-info">
                    <div class="calc-title">RUT Completo</div>
                    <div class="calc-formatted-rut" id="full-rut-text">${fullRut}</div>
                    <button class="copy-btn" id="copy-rut-btn" onclick="copyToClipboard('${fullRut}', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        <span>Copiar RUT</span>
                    </button>
                </div>
                <div class="dv-badge">
                    <div class="dv-label">DV</div>
                    <div class="dv-val">${dv}</div>
                </div>
            </div>
        `;
    }
}

// Copy to Clipboard Utility
function copyToClipboard(text, btnElementOrId) {
    let copyBtn;
    if (typeof btnElementOrId === 'string') {
        copyBtn = document.getElementById(btnElementOrId);
    } else if (btnElementOrId) {
        copyBtn = btnElementOrId;
    } else {
        copyBtn = document.getElementById('copy-rut-btn');
    }

    navigator.clipboard.writeText(text).then(() => {
        if (!copyBtn) return;
        
        copyBtn.classList.add('copied');
        const span = copyBtn.querySelector('span');
        const svg = copyBtn.querySelector('svg');
        const originalText = span ? span.textContent : 'Copiar';
        
        if (span) span.textContent = '¡Copiado!';
        
        // Change SVG to Checkmark
        let oldSvgInner = '';
        if (svg) {
            oldSvgInner = svg.innerHTML;
            svg.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
        }
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (span) span.textContent = originalText;
            if (svg) svg.innerHTML = oldSvgInner;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

// Add event listeners
rutInput.addEventListener('input', validateVerifyInput);
calcInput.addEventListener('input', validateCalcInput);

// Clear buttons logic
clearVerifyBtn.addEventListener('click', () => {
    rutInput.value = '';
    validateVerifyInput();
    rutInput.focus();
});

clearCalcBtn.addEventListener('click', () => {
    calcInput.value = '';
    validateCalcInput();
    calcInput.focus();
});

// Initial focus
window.addEventListener('DOMContentLoaded', () => {
    rutInput.focus();
});
