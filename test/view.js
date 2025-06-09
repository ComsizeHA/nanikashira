chrome.storage.local.get({ atai1: [], atai2: [] }, (data) => {
  const list1 = document.getElementById('ataiList1');
  const list2 = document.getElementById('ataiList2');

  data.atai1.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list1.appendChild(li);
  });

  data.atai2.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list2.appendChild(li);
  });
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const val1 = document.getElementById('input1').value.trim();
  const val2 = document.getElementById('input2').value.trim();

  if (val1 && val2) {
    chrome.storage.local.get({ atai1: [], atai2: [] }, (data) => {
      const updated1 = data.atai1;
      const updated2 = data.atai2;

      updated1.push(val1);
      updated2.push(val2);

      chrome.storage.local.set({ atai1: updated1, atai2: updated2 }, () => {
        alert("保存しました！");
        document.getElementById('input1').value = '';
        document.getElementById('input2').value = '';
      });
    });
  } else {
    alert("両方の値を入力してください。");
  }
  window.close();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.storage.local.remove(['atai1', 'atai2'], () => {
    alert("保存された値を削除しました。");
  });
  window.close();
});