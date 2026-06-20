/src
/security-rules
-ssrf.ts
-sql.ts
-crypto.ts
-cors.ts
extension.ts

//extension.ts içine eklenecek mantık
export function checkSqlInjection(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){
  const text = document.getText();
  const diagnostics: vscode.Diagnostic[] = [];

//Basit bir örnek String birleştirme ile SQL yazımını yakala
const sqlInjectionPattern = /db\.query\s*\(\s*["']SELECT.*?\+.*?\*.*?["']\S*\)/g;

let match;
  while((match = sqlInjectionPattern.exec(text)) !== null){
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);

  const diagnostic = new vscode.Diagnostic(
    new vscode.Range(startPos, endPos), 
    vscode.DiagnosticSeverity.Errror
    );
    diagnostics.push(diagnostic);
  }
  diagnosticCollection.set(document.uri , diagnostics);
}

vscode.workspace.onDidChangeTextDocument(event => {
  checkSqlInjection(event.document, diagnosticCollection); //SQL Kalkanı
                                         checkSSRF(event.document,diagnosticCollection);
});
