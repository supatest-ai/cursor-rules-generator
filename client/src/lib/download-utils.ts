import { GeneratedRule } from "@/types/wizard";

// Simple zip creation without external dependencies
export function createZipFromRules(rules: GeneratedRule[]): Blob {
  const files: { name: string; content: string }[] = rules.map(rule => ({
    name: rule.filename,
    content: rule.content
  }));

  // Create a simple zip-like structure using data URLs
  // For a proper implementation, you'd use JSZip or similar
  const zipContent = files.map(file => {
    const encoded = btoa(unescape(encodeURIComponent(file.content)));
    return `${file.name}:\n${encoded}\n---\n`;
  }).join('\n');

  return new Blob([zipContent], { type: 'application/zip' });
}

export function downloadRulesAsZip(rules: GeneratedRule[], filename: string = 'cursor-rules') {
  // Create individual files and download them as separate files
  // Since we can't create actual zip without libraries, we'll create a folder structure guide
  
  const folderStructure = `# Cursor Rules Installation Guide

## Generated Files
Place these files in your project's .cursor/rules/ directory:

${rules.map(rule => `- ${rule.filename}`).join('\n')}

## Directory Structure
\`\`\`
PROJECT_ROOT/
├── .cursor/
│   └── rules/
${rules.map(rule => `│       ├── ${rule.filename}`).join('\n')}
└── ...
\`\`\`

## Installation Instructions
1. Create the .cursor/rules/ directory in your project root if it doesn't exist
2. Copy each .mdc file to the .cursor/rules/ directory
3. Restart Cursor to load the new rules

Generated on: ${new Date().toISOString()}
Total rules: ${rules.length}
`;

  // Download the installation guide
  downloadTextFile(folderStructure, 'INSTALLATION_GUIDE.md');
  
  // Download each rule file individually
  rules.forEach(rule => {
    downloadTextFile(rule.content, rule.filename);
  });
}

export function downloadTextFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadAllRulesAsFiles(rules: GeneratedRule[], onComplete?: () => void) {
  // Create a small delay between downloads to avoid browser blocking
  rules.forEach((rule, index) => {
    setTimeout(() => {
      downloadTextFile(rule.content, rule.filename);
    }, index * 200);
  });
  
  // Download installation guide last
  setTimeout(() => {
    const folderStructure = `# Cursor Rules Installation Guide

## Generated Files
Place these files in your project's .cursor/rules/ directory:

${rules.map(rule => `- ${rule.filename}`).join('\n')}

## Directory Structure
\`\`\`
PROJECT_ROOT/
├── .cursor/
│   └── rules/
${rules.map(rule => `│       ├── ${rule.filename}`).join('\n')}
└── ...
\`\`\`

## Installation Instructions
1. Create the .cursor/rules/ directory in your project root if it doesn't exist
2. Copy each .mdc file to the .cursor/rules/ directory
3. Restart Cursor to load the new rules

Generated on: ${new Date().toISOString()}
Total rules: ${rules.length}
`;
    downloadTextFile(folderStructure, 'INSTALLATION_GUIDE.md');
    if (onComplete) onComplete();
  }, rules.length * 200 + 500);
}