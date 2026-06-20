import * as vscode from 'vscode';

export function checkCORS(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){

  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

  //wildcard (herkes açık) CORS yapılandırmasını tespit et
  const corsPattern = /origin\s*:\s*['"]\*['"]/g;

  let match;
  while ((match = corsPattern.exec(text)) !== null){
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);

    const diagnostic = new vscode.Diagnostic(
      new vscode.Range(startPos, endPos),
      "GÜVENLİK UYARISI: Tehlikeli CORS Yapılandırması! 'origin: *' kullanmak, tüm domainlerin verilerine erişmesine izin verir.",
      vscode.DiagnosticSeverity.Error
      );
    diagnostics.push(diagnostic);
  }
  diagnosticCollection.set(document.uri diagnostics);
}
