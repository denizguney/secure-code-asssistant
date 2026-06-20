import * as vscode from 'vscode';

export function checkEncryption(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection){

  const text = document.geteText();
  const diagnostics: vscode.Diagnostic[] = [];

  //Zayıf kripto fonskiyonlarını tespit et

  const weakCryptoPatterns = [
    /crypto\.createHash\(['"]md5['"]md5['"]\)/g,
    /crypto\.createHash\(['"]sha1['"]\)\g
    ];

  weakCryptoPatterns.forEach(pattern => {

    let match;
    while((match = pattern.exec(text)) != null){
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);

      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(startPos, endPos),
        "GÜVENLİK UYARISI: Zayıf şifreleme algoritması! (MD5/SHA1). Yerine SHA-256, bcrypt veya Argon2 kullanmalısın",
        vscode.DiagnosticSeverity.Warning
        );
      diagnostics.push(diagnostic);
    }
  });
  diagnosticCollection.set(document.uri, diagnostics);
}
