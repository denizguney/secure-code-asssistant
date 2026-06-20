//ssrf.ts
import * as vscode from 'vscode';

export function checkSSRF(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){
  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

//Capture potentially dangerous URL patterns or IP blocks (metadata services)
const ssrfPatterns = [
  /http:\/\/169\.254\.169\.254/g, //AWS /Azure Metadata service
  /http:\/\/metadata\.google\.internal/g, //GCP Metadata Service
  /axios\.get\(\s*req\.body/g //Using URLs derived from user input
  ];

ssrfPatterns.forEach(pattern => {
  let match;
  while((match = pattern.exec(text)) !== null){
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);

  const diagnostic = new vscode.Diagnostic(
    new vscode.Range(startPos , endPos),
    "DİKKAT SSRF riski: Metadata servisine erişim veya kontrolsüz URL kullanımı tespit edildi.",
    vscode.DiagnosticSeverity.Error
    );
  }
});
  diagnosticCollection.set(document.uri, diagnostics);
}
