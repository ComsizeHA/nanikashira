document.getElementById("runBtn").addEventListener("click", async () => {
  const log = (msg) => {
    const div = document.createElement("div");
    div.textContent = msg;
    document.getElementById("log").appendChild(div);
  };

  // 処理1
  function f1() {
    return new Promise(resolve => {
      setTimeout(() => {
        log("f1 done");
        resolve();
      }, 1000);
    });
  }

  // 処理2（同期）
  function f2() {
    log("f2 done");
  }

  // 処理3
  async function f3() {
    log("f3 start");
    await new Promise(resolve => setTimeout(resolve, 500));
    log("f3 done");
  }

  // 同期実行ユーティリティ
  async function runInOrder(tasks) {
    for (const fn of tasks) {
      await fn();
    }
    log("All done!");
  }

  // 実行
  await runInOrder([f1, f2, f3]);
});