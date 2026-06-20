import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Tebrikler dostum, "secure-code-assistant" aktif ve siber kalkan hazır!');

    // 1. Ana Komut Kaydı
    const startCommand = vscode.commands.registerCommand('secure-code-assistant.start', () => {
        vscode.window.showInformationMessage('Güvenli Kod Asistanı Aktif Edildi! Siber kalkanlar devrede.');
    });
    context.subscriptions.push(startCommand);

    // 2. XSS Kalkanı (CompletionItemProvider)
    const xssShieldProvider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'typescript' }, // Sadece TS dosyalarında çalışsın
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItem = new vscode.CompletionItem("!sec-xss", vscode.CompletionItemKind.Snippet);
                
                completionItem.insertText = new vscode.SnippetString(
                    'function secureXssClean(input: string): string {\n' +
                    '    if (!input) return "";\n' +
                    '    return input\n' +
                    '        .replace(/&/g, "&amp;")\n' +
                    '        .replace(/</g, "&lt;")\n' +
                    '        .replace(/>/g, "&gt;")\n' +
                    '        .replace(/"/g, "&quot;")\n' +
                    '        .replace(/\'/g, "&#x27;")\n' +
                    '        .replace(/\\//g, "&#x2F;");\n' +
                    '}\n' +
                    '// Örnek Kullanım: const temizVeri = secureXssClean(kullaniciGirdisi);'
                );

                completionItem.documentation = new vscode.MarkdownString("Yazılımcıyı XSS (Cross-Site Scripting) açıklarına karşı koruyan siber güvenlik kalkanı.");
                
                return [completionItem];
            }
        },
        '!' // Tetikleyici karakterimiz
    );

    context.subscriptions.push(xssShieldProvider);
}

export function deactivate() {}
