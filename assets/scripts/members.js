const MEMBER_LIST = [
  {
    name: 'Corvimae',
    twitchId: '7cc1539c-0646-402f-9768-52a406fcd1d4',
    description: 'Hello I am May I will write a thing later.',
  }
];

const setActiveMember = (member, element) => {
  element.classList.add('active');
  document.querySelector('.selected-member-name').textContent = member.name;
  document.querySelector('.selected-member-description').innerHTML = member.description;
}


(() => {
  const listElement = document.querySelector('.member-list');

  MEMBER_LIST.forEach((member, index) => {
    const memberElement = document.createElement('li');
    const memberImage = document.createElement('img');
    const memberName = document.createElement('span');

    memberName.textContent = member.name;
    memberImage.src = `https://static-cdn.jtvnw.net/jtv_user_pictures/${member.twitchId}-profile_image-70x70.png`;

    memberElement.appendChild(memberImage);
    memberElement.appendChild(memberName);

    listElement.appendChild(memberElement);
    
    memberElement.addEventListener('click', () => {
      document.querySelectorAll('.member-list li.active').forEach(element => element.classList.remove('active'));

      setActiveMember(member, memberElement);
    });

    if (index === 0) setActiveMember(member, memberElement);
  });

})();