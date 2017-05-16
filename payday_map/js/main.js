const mission = document.querySelector(".mission");

mission.classList.add('active');


function removeTransition(e){
  if (e.propertyName !== 'transform') return;
  this.classList.remove('active');
};

mission.addEventListener('transitionend', removeTransition);