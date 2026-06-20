import * as vscode from 'vscode';

export function checkSQLInjection(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){
  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

cons sqlPattern = /db\.execute\s*\(\s*["'].*["']\s*\+\s*[a-zA-Z0-9_]+\s*\)/g;

let match;
  while((match = sqlPattern.exec(text)) !== null){
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);

    const diagnostic = new vscode.Diagnostic(
      new vscode.Range(startPos, endPos),
      "Güvenlik Uyarısı: SQL Injection riski String birleştirme yerine 'Parametrized Query' kullanmalısın",
      vscode.DiagnosticSeverity.Error
      );
    diagnostic.push(diagnostic);
  }
  diagnosticCollection.set(document.uri, diagnostics);
}
