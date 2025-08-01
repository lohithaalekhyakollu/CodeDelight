 const correctPreorder = [50, 30, 20, 40, 70, 60, 80];
    const dropRow = document.getElementById('drop-row');
    const coinsDisplay = document.getElementById('coins');
    const tree = document.getElementById('tree');
    const submitBtn = document.getElementById('submit-btn');
    let coins = 50;

    function createDropZones() {
      dropRow.innerHTML = "";
      correctPreorder.forEach(() => {
        const drop = document.createElement('div');
        drop.className = 'drop-zone';

        drop.addEventListener('dragover', e => e.preventDefault());

        drop.addEventListener('drop', e => {
          e.preventDefault();
          const val = e.dataTransfer.getData('text/plain');
          if (drop.textContent.trim() === '') {
            drop.textContent = val;
            drop.classList.add('filled');
            const draggedNode = [...tree.querySelectorAll('.tree-node')].find(n => n.dataset.value === val);
            if (draggedNode) draggedNode.style.visibility = "hidden";
          }
        });

        dropRow.appendChild(drop);
      });
    }

    function makeNodesDraggable() {
      document.querySelectorAll('.tree-node').forEach(node => {
        node.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', node.dataset.value);
        });
      });
    }

    submitBtn.addEventListener('click', () => {
      if (coins < 10) {
        alert("🚫 You need at least 10 coins to play.");
        return;
      }

      const entered = [...dropRow.children].map(d => d.textContent.trim());
      const correct = correctPreorder.map(String);

      if (JSON.stringify(entered) === JSON.stringify(correct)) {
        coins -= 5;
        alert("✅ Correct! You won. 5 coins deducted as game cost.");
         localStorage.setItem("rewardCoins", "5");
      } else {
        coins -= 10;
        alert("❌ Incorrect! You lost. 10 coins deducted.");
      }

      coinsDisplay.textContent = coins;

      if (coins < 10) {
        submitBtn.disabled = true;
        window.location.href = '../html/funzone.html';
      }
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      createDropZones();
      document.querySelectorAll('.tree-node').forEach(node => {
        node.style.visibility = "visible";
      });
      if (coins >= 10) submitBtn.disabled = false;
    });

    createDropZones();
    makeNodesDraggable();