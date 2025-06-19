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
    const val3 = document.getElementById('work_type').value.trim();
    let work_type_code;
    if (val3 === "1"){
      work_type_code = 1;
    } else if(val3 === "2") {
      work_type_code = 3;
    }
    if (val1 && val2 && val3) {
      chrome.storage.local.get({ atai: [],atai2: []}, (data) => {
        const updated = data.atai;
        const updated2 = data.atai2;
        updated.push(val1);
        updated.push(val2);
        updated2.push(work_type_code);
        updated2.push(work_type_code + 1);
        chrome.storage.local.set({ atai: updated}, () => {
          document.getElementById('input1').value = '';
          document.getElementById('input2').value = '';
        });
        chrome.storage.local.set({ atai2: updated2}, () => {
          document.getElementById('work_type').value = '';
        });
        alert("保存しました！");
      });
    } else {
      alert("すべての値を入力してください。");
    }
    window.location.reload();
  });

  clearBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['atai', 'atai2'], () => {
      alert("保存された値を削除しました。");
    });
    window.location.reload();
  });
});