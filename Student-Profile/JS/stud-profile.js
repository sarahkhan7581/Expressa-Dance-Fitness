document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            sections.forEach(section => {
                section.classList.remove('active');
            });

            document.getElementById(targetId).classList.add('active');
        });
    });
});

//upload image
document.addEventListener('DOMContentLoaded', function() {
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const avatarInput = document.getElementById('avatar-input');
    const navbarAvatar = document.getElementById('navbar-avatar');
    const topNavLogo = document.getElementById('top-nav-logo-img');

    editAvatarBtn.addEventListener('click', function() {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newAvatarUrl = e.target.result;
                navbarAvatar.src = newAvatarUrl;
                topNavLogo.src = newAvatarUrl;

                // Here you would typically send an AJAX request to update the server
                console.log('Updated profile photo');

                // Visual feedback
                editAvatarBtn.textContent = 'Photo Updated';
                editAvatarBtn.classList.add('editing');
                setTimeout(() => {
                    editAvatarBtn.textContent = 'Edit Photo';
                    editAvatarBtn.classList.remove('editing');
                }, 2000); // Reset after 2 seconds
            };
            reader.readAsDataURL(file);
        }
    });
});

//Achievement Editing
document.addEventListener('DOMContentLoaded', function () {
    const achievementsSection = document.getElementById('achievements');
    const editAchievementsBtn = achievementsSection.querySelector('.edit-achievements-btn');
    const addAchievementBtn = achievementsSection.querySelector('.add-achievement-btn');
    const achievementsContainer = achievementsSection.querySelector('.achievements-container');

    let isEditMode = false;

    editAchievementsBtn.addEventListener('click', toggleEditMode);
    addAchievementBtn.addEventListener('click', addNewAchievement);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            editAchievementsBtn.textContent = 'Save Changes';
            editAchievementsBtn.classList.add('editing');
            addAchievementBtn.style.display = 'inline-block';
            enableEditMode();
        } else {
            editAchievementsBtn.textContent = 'Edit Achievements';
            editAchievementsBtn.classList.remove('editing');
            addAchievementBtn.style.display = 'none';
            saveChanges();
        }
    }

    function enableEditMode() {
        const items = achievementsContainer.querySelectorAll('.achievement-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const media = item.querySelector('img, video');

            h3.contentEditable = true;
            p.contentEditable = true;
            h3.classList.add('editable');
            p.classList.add('editable');

            if (!item.querySelector('.edit-media-btn')) {
                const editMediaBtn = document.createElement('button');
                editMediaBtn.textContent = 'Edit Media';
                editMediaBtn.className = 'edit-media-btn';
                editMediaBtn.addEventListener('click', () => editMedia(media));
                item.appendChild(editMediaBtn);
            }
        });
    }

    function saveChanges() {
        const items = achievementsContainer.querySelectorAll('.achievement-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const editMediaBtn = item.querySelector('.edit-media-btn');

            h3.contentEditable = false;
            p.contentEditable = false;
            h3.classList.remove('editable');
            p.classList.remove('editable');

            if (editMediaBtn) {
                editMediaBtn.remove();
            }

            // Here you would typically send an AJAX request to update the server
            console.log(`Updated achievement: ${h3.textContent} - ${p.textContent}`);
        });
    }

    function editMedia(mediaElement) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = mediaElement.tagName === 'IMG' ? 'image/*' : 'video/*';
        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    mediaElement.src = e.target.result;
                    // Here you would typically send an AJAX request to update the server
                    console.log('Updated achievement media');
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    }

    function addNewAchievement() {
        const newItem = document.createElement('div');
        newItem.className = 'achievement-item';
        newItem.innerHTML = `
            <div class="txt">
                <h3>New Achievement Title</h3>
                <p>New Achievement Description</p>
            </div>
            <img src="placeholder.jpg" alt="New Achievement" class="achievement-image">
        `;

        achievementsContainer.appendChild(newItem);

        if (isEditMode) {
            const h3 = newItem.querySelector('h3');
            const p = newItem.querySelector('p');
            const media = newItem.querySelector('img');

            h3.contentEditable = true;
            p.contentEditable = true;
            h3.classList.add('editable');
            p.classList.add('editable');

            const editMediaBtn = document.createElement('button');
            editMediaBtn.textContent = 'Edit Media';
            editMediaBtn.className = 'edit-media-btn';
            editMediaBtn.addEventListener('click', () => editMedia(media));
            newItem.appendChild(editMediaBtn);
        }
    }
});

// Competition Editing

document.addEventListener('DOMContentLoaded', function () {
    const competitionsSection = document.getElementById('competitions');
    const editCompetitionsBtn = competitionsSection.querySelector('.edit-competitions-btn');
    const addCompetitionBtn = competitionsSection.querySelector('.add-competition-btn');
    const competitionsContainer = competitionsSection.querySelector('.competitions-container');

    let isEditMode = false;

    editCompetitionsBtn.addEventListener('click', toggleEditMode);
    addCompetitionBtn.addEventListener('click', addNewCompetition);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            editCompetitionsBtn.textContent = 'Save Changes';
            editCompetitionsBtn.classList.add('editing');
            addCompetitionBtn.style.display = 'inline-block';
            enableEditMode();
        } else {
            editCompetitionsBtn.textContent = 'Edit Competitions';
            editCompetitionsBtn.classList.remove('editing');
            addCompetitionBtn.style.display = 'none';
            saveChanges();
        }
    }

    function enableEditMode() {
        const items = competitionsContainer.querySelectorAll('.competition-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const media = item.querySelector('img, video');

            h3.contentEditable = true;
            p.contentEditable = true;
            h3.classList.add('editable');
            p.classList.add('editable');

            if (!item.querySelector('.edit-media-btn')) {
                const editMediaBtn = document.createElement('button');
                editMediaBtn.textContent = 'Edit Media';
                editMediaBtn.className = 'edit-media-btn';
                editMediaBtn.addEventListener('click', () => editMedia(media));
                item.appendChild(editMediaBtn);
            }
        });
    }

    function saveChanges() {
        const items = competitionsContainer.querySelectorAll('.competition-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const editMediaBtn = item.querySelector('.edit-media-btn');

            h3.contentEditable = false;
            p.contentEditable = false;
            h3.classList.remove('editable');
            p.classList.remove('editable');

            if (editMediaBtn) {
                editMediaBtn.remove();
            }

            // Here you would typically send an AJAX request to update the server
            console.log(`Updated competition: ${h3.textContent} - ${p.textContent}`);
        });
    }

    function editMedia(mediaElement) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = mediaElement.tagName === 'IMG' ? 'image/*' : 'video/*';
        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    mediaElement.src = e.target.result;
                    // Here you would typically send an AJAX request to update the server
                    console.log('Updated competition media');
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    }

    function addNewCompetition() {
        const newItem = document.createElement('div');
        newItem.className = 'competition-item';
        newItem.innerHTML = `
            <div class="txt">
                <h3>New Competition Title</h3>
                <p>New Competition Description</p>
            </div>
            <img src="placeholder.jpg" alt="New Competition" class="competition-image">
        `;

        competitionsContainer.appendChild(newItem);

        if (isEditMode) {
            const h3 = newItem.querySelector('h3');
            const p = newItem.querySelector('p');
            const media = newItem.querySelector('img');

            h3.contentEditable = true;
            p.contentEditable = true;
            h3.classList.add('editable');
            p.classList.add('editable');

            const editMediaBtn = document.createElement('button');
            editMediaBtn.textContent = 'Edit Media';
            editMediaBtn.className = 'edit-media-btn';
            editMediaBtn.addEventListener('click', () => editMedia(media));
            newItem.appendChild(editMediaBtn);
        }
    }
});

