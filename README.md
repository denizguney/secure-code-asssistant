# Secure Code Assistant 

Secure Code Assistant is a powerful Visual Studio Code extension designed for developers and security researchers. It helps mitigate critical vulnerabilities like Cross-Site Scripting (XSS) and Server-Side Request Forgery (SSRF) during the development phase by providing secure-by-default code snippets directly into your editor.

---

## 🚀 Features

### 1. Smart XSS Shield (`!sec-xss`)
* Automatically provides a robust HTML Entity Encoding function to sanitize user inputs.
* Replaces dangerous characters like `<`, `>`, `&`, `"`, and `'` with their respective safe HTML entities.
* Prevents **Cross-Site Scripting (XSS)** vulnerabilities before the code ever leaves the local environment.

### 2. SSRF Firewall (`!sec-url`)
* Implements a strict URL validation mechanism with native parsing.
* Features a customizable infrastructure containing an internal **Whitelist** for approved corporate APIs and a hardcoded **Blacklist**.
* Mitigates **Server-Side Request Forgery (SSRF)** by explicitly blocking access to local network interfaces and dangerous cloud metadata endpoints (e.g., `127.0.0.1`, `localhost`, and `169.254.169.254`).

---

## 🛠️ Installation & Usage

1. Open any TypeScript (`.ts`) or JavaScript (`.js`) file inside Visual Studio Code.
2. Type `!` followed by your desired security trigger shortcut (e.g., `!sec-xss` or `!sec-url`).
3. Press `Tab` or `Enter` to instantly inject the secure code block into your project.

---

## 🛡️ Security & Disclaimer
This project is developed with a defensive security mindset to actively encourage secure coding practices aligned with OWASP Top 10 standards. Continuous updates will be rolled out to patch and support emerging secure code architecture.
