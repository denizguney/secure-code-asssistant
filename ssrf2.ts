import * as vscode from 'vscode';

export function checkSSRF(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){
  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

//Dangerous IP and URL patterns
const ssrfPatterns = [
  /http:\/\/169\.254\.169\.254/g,
  /http:\/\/metadata\.google\.internal/g
  ];
  ssrfPatterns.forEach(pattern => {
    let match;
    while((match = pattern.exec(text)) !== null){
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);

    const diagnostic = new vscode.Diagnostic(
      new vscode.Range(startPos, endPos),
      "DİKKAT SSRF riski: Bulut metadata servisine erişim tespit edildi. Bu ciddi bir güvenlik açığıdır!",
      vscode.DiagnosticSeverity.Error
      );
      diagnostics.push(diagnostic);
    }
  });
  diagnosticCollection.set(document.uri, diagnostics);
}
