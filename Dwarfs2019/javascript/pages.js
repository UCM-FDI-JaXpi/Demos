function show(shown, hidden) {
  document.getElementById(hidden).style.display='none';
  document.getElementById(shown).style.display='block';
  return false;
}

document.getElementById('Page2').style.display = 'none';

document.getElementById("about").addEventListener("click", function(){
  alert("Dwarfs 2019\nGPLv3\nMade with love by mvasilkov and yutyo.");
});

document.getElementById("quit-game").addEventListener("click", function(){
      window.close();
});
