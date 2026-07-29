"use client";

import React from "react";

export function ThemeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600&family=Work+Sans:wght@400;500;600;700&display=swap');

      .register-page-theme {
        --bg:#0e0b13;
        --bg-raised:#15111c;
        --surface:#1a1524;
        --line:#2b2438;
        --line-bright:#423a54;
        --paper:#efecf5;
        --ink:#a79cbd;
        --muted:#6b6280;
        --accent:#8b5cf6;
        --amber:#c084fc;
        --danger:#f87171;
        --success:#4ade80;
      }

      .register-page-theme .mono{font-family:'JetBrains Mono',monospace;}
      .register-page-theme button{font-family:inherit;cursor:pointer;}
 
      /* INTRO */
      .register-page-theme .eyebrow{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);display:inline-flex;align-items:center;gap:8px;margin-bottom:24px;}
      .register-page-theme .eyebrow::before{content:'';width:16px;height:1px;background:var(--accent);}
      .register-page-theme .intro h1{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(30px,5vw,52px);line-height:1.02;margin:0 0 24px;}
      .register-page-theme .intro h1 em{font-style:italic;color:var(--accent);font-weight:500;}
      .register-page-theme .intro .sub{color:var(--ink);font-size:14px;max-width:480px;}
      @media(min-width:768px){ .register-page-theme .intro .sub{font-size:15.5px;} }

      /* STEPPER */
      .register-page-theme .stepper{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;}
      @media(min-width:768px){ .register-page-theme .stepper{justify-content:flex-start;margin-bottom:40px;} }
      .register-page-theme .step{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);flex-shrink:0;}
      .register-page-theme .step-num{width:28px;height:28px;border:1px solid var(--line-bright);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
      .register-page-theme .step-active .step-num{border-color:var(--accent);color:var(--accent);background:rgba(139,92,246,0.1);}
      .register-page-theme .step-active .step-label{color:var(--paper);}
      .register-page-theme .step-done .step-num{background:var(--accent);border-color:var(--accent);color:#0e0b13;}
      .register-page-theme .step-done{color:var(--ink);}
      .register-page-theme .step-label{display:none;}
      .register-page-theme .step-line{flex:1;height:1px;background:var(--line);margin:0 4px;min-width:12px;}
      .register-page-theme .step-line-done{background:var(--accent);}
      @media(min-width:700px){ .register-page-theme .step-label{display:inline;} .register-page-theme .step-line{min-width:24px;margin:0 8px;} }

      /* FORM CARD */
      .register-page-theme .form-card{border:1px solid rgba(255, 255, 255, 0.08);background:rgba(26, 21, 36, 0.6);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:32px 28px;border-radius:12px;box-shadow:0 24px 48px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);}
      @media(min-width:768px){ .register-page-theme .form-card{padding:48px 40px;} }
      .register-page-theme .stage-head{display:flex;flex-direction:column;gap:4px;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.08);}
      @media(min-width:768px){ .register-page-theme .stage-head{flex-direction:row;justify-content:space-between;align-items:baseline;margin-bottom:28px;padding-bottom:18px;} }
      .register-page-theme .stage-head h2{font-family:'Fraunces',serif;font-weight:600;font-size:18px;margin:0;}
      @media(min-width:768px){ .register-page-theme .stage-head h2{font-size:22px;} }
      .register-page-theme .stage-note{font-size:11px;color:var(--muted);}
      .register-page-theme .stage-body{display:flex;flex-direction:column;gap:22px;}

      .register-page-theme .field-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
      @media(max-width:600px){ .register-page-theme .field-row{grid-template-columns:1fr; gap:16px;} }
      .register-page-theme .field{display:flex;flex-direction:column;gap:8px;}
      .register-page-theme .field-label{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#c084fc;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;}
      .register-page-theme .field-hint{color:var(--muted);text-transform:none;letter-spacing:0;font-weight:normal;}
      .register-page-theme .field-error{font-size:11.5px;color:var(--danger);}

      .register-page-theme .form-card input[type="text"],
      .register-page-theme .form-card input[type="email"],
      .register-page-theme .form-card input[type="tel"],
      .register-page-theme .form-card input:not([type]),
      .register-page-theme .form-card select,
      .register-page-theme .form-card textarea{
        background:rgba(10, 8, 15, 0.75);border:1px solid var(--line-bright);color:#ffffff;
        font-weight:500;padding:12px 14px;font-family:'Work Sans',sans-serif;font-size:16px;width:100%;
        border-radius:6px;transition:all 0.2s ease;
      }
      @media(min-width:768px){ 
        .register-page-theme .form-card input[type="text"],
        .register-page-theme .form-card input[type="email"],
        .register-page-theme .form-card input[type="tel"],
        .register-page-theme .form-card input:not([type]),
        .register-page-theme .form-card select,
        .register-page-theme .form-card textarea{
          font-size:14px;
        } 
      }
      .register-page-theme .form-card input:focus,
      .register-page-theme .form-card select:focus,
      .register-page-theme .form-card textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(139, 92, 246, 0.15);background:rgba(10, 8, 15, 0.95);}
      .register-page-theme .form-card input::placeholder,
      .register-page-theme .form-card textarea::placeholder{
        color:#71717a;
        font-weight:400;
        font-size:inherit;
        font-family:inherit;
      }
      .register-page-theme .text-muted {
        color:#71717a !important;
      }
      .register-page-theme .form-card input:-webkit-autofill,
      .register-page-theme .form-card input:-webkit-autofill:hover, 
      .register-page-theme .form-card input:-webkit-autofill:focus, 
      .register-page-theme .form-card input:-webkit-autofill:active{
          -webkit-box-shadow: 0 0 0 30px var(--bg) inset !important;
          -webkit-text-fill-color: var(--paper) !important;
          transition: background-color 5000s ease-in-out 0s;
      }
      .register-page-theme .form-card textarea{resize:vertical;}
      .register-page-theme .form-card select{appearance:none;background-image:linear-gradient(45deg, transparent 50%, var(--ink) 50%), linear-gradient(135deg, var(--ink) 50%, transparent 50%);background-position:calc(100% - 18px) center, calc(100% - 13px) center;background-size:5px 5px, 5px 5px;background-repeat:no-repeat;}

      /* CUSTOM SELECT */
      .register-page-theme .custom-select-container {
        position: relative;
        width: 100%;
      }
      .register-page-theme .custom-select-trigger {
        background: rgba(14, 11, 19, 0.5);
        border: 1px solid var(--line-bright);
        color: var(--paper);
        padding: 12px 14px;
        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        width: 100%;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        transition: all 0.2s ease;
      }
      @media(min-width: 768px) {
        .register-page-theme .custom-select-trigger {
          font-size: 14px;
        }
      }
      .register-page-theme .custom-select-trigger:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        background: rgba(14, 11, 19, 0.8);
      }
      .register-page-theme .custom-select-trigger .arrow {
        border: solid var(--ink);
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3.5px;
        transform: rotate(45deg);
        transition: transform 0.2s ease;
        margin-right: 4px;
      }
      .register-page-theme .custom-select-trigger .arrow.arrow-up {
        transform: rotate(-135deg);
      }
      .register-page-theme .custom-select-options {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--surface);
        border: 1px solid var(--line-bright);
        border-radius: 6px;
        z-index: 50;
        max-height: 220px;
        overflow-y: auto;
        overscroll-behavior: contain;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
      }
      .register-page-theme .custom-select-option {
        padding: 11px 14px;
        font-size: 14px;
        color: var(--paper);
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .register-page-theme .custom-select-option:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--accent);
      }
      .register-page-theme .custom-select-option.selected {
        background: rgba(139, 92, 246, 0.2);
        color: var(--accent);
        font-weight: 500;
      }

      /* CHECKBOX CHIPS */
      .register-page-theme .checkbox-grid{display:flex;flex-wrap:wrap;gap:8px;}
      @media(min-width:768px){ .register-page-theme .checkbox-grid{gap:10px;} }
      .register-page-theme .chip{display:flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line-bright);font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink);cursor:pointer;transition:all 0.2s cubic-bezier(0.16, 1, 0.3, 1);border-radius:20px;background:rgba(255,255,255,0.02);user-select:none;position:relative;}
      @media(min-width:768px){ .register-page-theme .chip{padding:9px 16px;font-size:12.5px;} }
      .register-page-theme .chip input{position:absolute;opacity:0;width:0;height:0;}
      .register-page-theme .chip:hover{border-color:var(--ink);background:rgba(255,255,255,0.05);color:var(--paper);}
      .register-page-theme .chip-active{border-color:var(--accent);color:var(--paper);background:rgba(139,92,246,0.12);box-shadow:0 0 16px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.05);}
      .register-page-theme .chip-dot {width:6px;height:6px;border-radius:50%;background:var(--muted);transition:all 0.25s ease;flex-shrink:0;}
      .register-page-theme .chip-active .chip-dot {background:var(--accent);box-shadow:0 0 8px var(--accent);transform:scale(1.2);}

      /* DROPZONE */
      .register-page-theme .dropzone{border:1.5px dashed var(--line-bright);padding:28px 16px;text-align:center;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:8px;border-radius:8px;}
      @media(min-width:768px){ .register-page-theme .dropzone{padding:36px 20px;} }
      .register-page-theme .dropzone-active{border-color:var(--accent);background:rgba(139,92,246,0.06);}
      .register-page-theme .dropzone-filled{border-style:solid;border-color:var(--accent);}
      .register-page-theme .dz-title{color:var(--ink);font-size:14px;}
      .register-page-theme .dz-hint{color:var(--muted);font-size:11px;}
      .register-page-theme .dz-file{color:var(--paper);font-size:13.5px;word-break:break-all;}
      .register-page-theme .dz-size{color:var(--muted);font-size:11.5px;}
      .register-page-theme .dz-remove{background:none;border:1px solid var(--line-bright);color:var(--ink);font-family:'JetBrains Mono',monospace;font-size:11px;padding:6px 12px;margin-top:6px;}
      .register-page-theme .dz-remove:hover{border-color:var(--danger);color:var(--danger);}

      /* ACTIONS */
      .register-page-theme .stage-actions{display:flex;flex-direction:column-reverse;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);}
      @media(min-width:600px){ .register-page-theme .stage-actions{flex-direction:row;justify-content:space-between;align-items:center;margin-top:32px;padding-top:24px;} }
      .register-page-theme .btn-primary{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13.5px;padding:14px 22px;background:var(--accent);color:#0e0b13;border:1px solid var(--accent);display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;border-radius:6px;box-shadow:0 0 20px rgba(139,92,246,0.3);width:100%;}
      @media(min-width:600px){ .register-page-theme .btn-primary{width:auto;} }
      .register-page-theme .btn-primary:hover{background:transparent;color:var(--accent);box-shadow:0 0 30px rgba(139,92,246,0.5);}
      .register-page-theme .btn-primary:disabled{opacity:0.6;cursor:not-allowed;}
      .register-page-theme .btn-secondary{display:none;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13.5px;padding:14px 22px;background:transparent;border:1px solid var(--line-bright);color:var(--paper);transition:all .2s;border-radius:6px;width:100%;text-align:center;}
      @media(min-width:600px){ .register-page-theme .btn-secondary{display:inline-block;width:auto;} }
      .register-page-theme .btn-secondary:hover{border-color:var(--accent);color:var(--accent);}

      .register-page-theme .submit-error{margin-top:20px;padding:12px 16px;border:1px solid var(--danger);color:var(--danger);font-size:12.5px;}

      /* SUCCESS */
      .register-page-theme .success-title{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(32px,5vw,50px);margin:0 0 24px;}
      @media(min-width:768px){ .register-page-theme .success-title{margin:0 0 32px;} }
      .register-page-theme .success-title em{font-style:italic;color:var(--accent);font-weight:500;}
      .register-page-theme .receipt{border:1px solid var(--line);background:var(--surface);padding:16px 20px;margin-bottom:24px;max-width:420px;word-break:break-all;}
      @media(min-width:768px){ .register-page-theme .receipt{padding:20px 24px;} }
      .register-page-theme .receipt-row{display:flex;flex-direction:column;gap:4px;font-size:13px;padding:8px 0;border-bottom:1px solid var(--line);}
      @media(min-width:480px){ .register-page-theme .receipt-row{flex-direction:row;justify-content:space-between;} }
      .register-page-theme .receipt-row:last-child{border-bottom:none;}
      .register-page-theme .receipt-row span:first-child{color:var(--muted);}
      .register-page-theme .receipt-row .ok{color:var(--success);}
      .register-page-theme .success-sub{color:var(--ink);font-size:15px;max-width:460px;margin-bottom:32px;line-height:1.6;}
    `}</style>
  );
}
