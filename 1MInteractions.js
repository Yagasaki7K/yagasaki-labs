// Função 1 — Faz 1 milhão de interações e "simula" console.log sem realmente imprimir
function logSimulation() {
  console.time("logSimulation");
  for (let i = 0; i < 1_000_000; i++) {
    // Simula uma operação de log sem imprimir
    const text = `Interação número: ${i}`;
  }
  console.timeEnd("logSimulation");
}

// Função 2 — Faz 1 milhão de interações e acumula em uma string (printa uma vez só)
function printOnce() {
  console.time("printOnce");
  let output = "";
  for (let i = 0; i < 1_000_000; i++) {
    output += `Interação número: ${i}\n`;
  }
  console.timeEnd("printOnce");
  console.log("Tamanho do texto final:", output.length, "caracteres");
}

function printInfo() {
  console.time("printInfo");
  let output = "";
  for (let i = 0; i < 1_000_000; i++) {
    output += `Interação número: ${i}\n`;
  }
  console.timeEnd("printInfo");
  console.info("Tamanho do texto final:", output.length, "caracteres");
}

function printWarn() {
  console.time("printWarn");
  let output = "";
  for (let i = 0; i < 1_000_000; i++) {
    output += `Interação número: ${i}\n`;
  }
  console.timeEnd("printWarn");
  console.warn("Tamanho do texto final:", output.length, "caracteres");
}

// Execução
console.log("=== Benchmark Bun.js ===\n");

logSimulation();
printOnce();
printInfo();
printWarn()

console.log("\n✅ Benchmark concluído!");
