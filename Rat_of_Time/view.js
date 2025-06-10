document.addEventListener('DOMContentLoaded', () => {
  const list1 = document.getElementById('ataiList1');
  const list2 = document.getElementById('ataiList2');
  const saveBtn = document.getElementById('saveBtn');
  const clearBtn = document.getElementById('clearBtn');

  chrome.storage.local.get({ atai: [], atai2: [] }, (data) => {
    data.atai.forEach(item => {
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

  saveBtn.addEventListener('click', () => {
    const val1 = document.getElementById('input1').value.trim();
    const val2 = document.getElementById('input2').value.trim();
    if (val1 && val2) {
      chrome.storage.local.get({ atai: []}, (data) => {
        const updated = data.atai;
        updated.push(val1);
        updated.push(val2);
        chrome.storage.local.set({ atai: updated}, () => {
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

  clearBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['atai', 'atai2'], () => {
      alert("保存された値を削除しました。");
    });
    window.close();
  });
});