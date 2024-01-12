const log = `Uncaught (in promise) Error: Unknown Component: interaction.tooltipThumb
    at In (helper.js:33:11)
    at l (library.js:20:32)
    at eval (library.js:24:16)
    at CO (plot.js:402:25)
    at eval (plot.js:195:41)
    at Generator.next (<anonymous>)
    at m (plot.js:4:58)`;

const regex = /(\w+\.\w+):(\d+):(\d+)/g;
let match;
while ((match = regex.exec(log)) !== null) {
  const fileName = match[1];
  const lineNumber = match[2];
  const columnNumber = match[3];
  
  console.log(`文件名: ${fileName}, 行号: ${lineNumber}, 列号: ${columnNumber}`);
}
