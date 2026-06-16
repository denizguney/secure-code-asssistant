import * as vscode from 'vscode';

// Eklenti ilk aktif edildiğinde bu fonksiyon tetiklenir 
export function activate(context: vscode.ExtensionContext) {
    
    console.log('Tebrikler dostum, "secure-code-assistant" şu an aktif ve siber kalkan hazır!');

    // Geliştirici "Secure Code Assistant: Start" komutunu çalıştırdığında tetiklenecek ana kod
    const disposable = vscode.commands.registerCommand('secure-code-assistant.start', () => {
        // Editörün sağ alt köşesinde siber araştırmacı tarzında bir bildirim çıkarıyoruz
        vscode.window.showInformationMessage('Güvenli Kod Asistanı Aktif Edildi! Siber kalkanlar devrede dostum.');
    });

    context.subscriptions.push(disposable);
}

// Eklenti kapatıldığında veya devre dışı bırakıldığında burası çalışır

const xssShieldProvider = vscode.languages.registerCompletionItemProvider({

    providerCompletionItems(document: vscode.TextDocument, position: vscode_Position){

        const completionItem = new vscode.completionItem("!sec-xss", vscode.completionItemKind.Snippet);

        completionItem.InsertText = new vscode.SnippetString([

                                '/**',
                    ' * @function secureXssClean',
                    ' * @description Girdideki tehlikeli HTML karakterlerini temizleyerek XSS zafiyetini engeller dostum. ',
                    ' */',
                    'function secureXssClean(input: string): string {',
                    '    if (!input) return "";',
                    '    return input',
                    '        .replace(/&/g, "&amp;")',
                    '        .replace(/</g, "&lt;")',
                    '        .replace(/>/g, "&gt;")',
                    '        .replace(/"/g, "&quot;")',
                    "        .replace(/'/g, '&#x27;')",
                    '        .replace(/\\//g, "&#x2F;");',
                    '// Örnek Kullanım: const temizVeri = secureXssClean(kullaniciGirdisi);'

                    

        ])
        
    }
})

             

                completionItem.documentation = new vscode.MarkdownString("Yazılımcıyı XSS (Cross-Site Scripting) açıklarına karşı koruyan siber güvenlik kalkanı.");{

                return [completionItem];({
                })
        '!' // Tetikleyici karakterimiz
    

    // XSS Kalkanını VS Code'a kaydediyoruz 
    context.subscriptions.push(xssShieldProvider);({
                })

// Eklenti kapatıldığında burası çalışır

export function deactivate() {



                }
            }
        