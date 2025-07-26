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

// Profile Edit Button and Photo
document.addEventListener('DOMContentLoaded', function () {
    const profileSection = document.getElementById('profile');
    const editProfileBtn = profileSection.querySelector('.edit-profile-btn');
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const avatarInput = document.getElementById('avatar-input');
    const navbarAvatar = document.getElementById('navbar-avatar');
    const topNavLogo = document.getElementById('top-nav-logo-img');
    const infoGroups = profileSection.querySelectorAll('.info-group');

    // Profile edit functionality
    editProfileBtn.addEventListener('click', function () {
        if (editProfileBtn.textContent === 'Edit Profile') {
            // Switch to edit mode
            editProfileBtn.textContent = 'Save Changes';
            editProfileBtn.classList.add('editing');
            infoGroups.forEach(group => {
                const span = group.querySelector('span');
                if (group.id === 'government-id-group') {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.className = 'edit-input';
                    span.replaceWith(input);
                } else {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = span.textContent;
                    input.className = 'edit-input';
                    span.replaceWith(input);
                }
            });
        } else {
            // Save changes
            editProfileBtn.textContent = 'Edit Profile';
            editProfileBtn.classList.remove('editing');
            infoGroups.forEach(group => {
                const input = group.querySelector('input');
                const span = document.createElement('span');
                if (group.id === 'government-id-group') {
                    if (input.files && input.files[0]) {
                        const img = document.createElement('img');
                        img.src = URL.createObjectURL(input.files[0]);
                        img.style.width = '250px';
                        img.style.height = '150px';
                        span.appendChild(img);
                    } else {
                        span.textContent = 'No image uploaded';
                    }
                } else {
                    span.textContent = input.value;
                }
                input.replaceWith(span);

                // Here you would typically send an AJAX request to update the server
                console.log(`Updated ${group.querySelector('label').textContent} to ${span.textContent || 'new image'}`);
            });
        }
    });



    // Profile photo edit functionality
    editAvatarBtn.addEventListener('click', function () {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
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

    // Close edit mode if user clicks outside
    document.addEventListener('click', function (event) {
        if (!profileSection.contains(event.target) && editProfileBtn.textContent === 'Save Changes') {
            // Revert changes and exit edit mode
            editProfileBtn.textContent = 'Edit Profile';
            editProfileBtn.classList.remove('editing');
            infoGroups.forEach(group => {
                const input = group.querySelector('input');
                if (input) {
                    const span = document.createElement('span');
                    span.textContent = input.defaultValue; // Use the original value
                    input.replaceWith(span);
                }
            });
        }
    });
});
// Edit for courses
document.addEventListener('DOMContentLoaded', function () {
    const coursesSection = document.getElementById('courses');
    const editCourseBtn = coursesSection.querySelector('.edit-course-btn');
    const infoGroups = coursesSection.querySelectorAll('.info-group');

    editCourseBtn.addEventListener('click', function () {
        if (editCourseBtn.textContent === 'Edit Course') {
            // Switch to edit mode
            editCourseBtn.textContent = 'Save Changes';
            editCourseBtn.classList.add('editing');
            infoGroups.forEach(group => {
                const span = group.querySelector('span');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                input.className = 'edit-input';
                span.replaceWith(input);
            });
        } else {
            // Save changes
            editCourseBtn.textContent = 'Edit Course';
            editCourseBtn.classList.remove('editing');
            infoGroups.forEach(group => {
                const input = group.querySelector('input');
                const span = document.createElement('span');
                span.textContent = input.value;
                input.replaceWith(span);

                // Here you would typically send an AJAX request to update the server
                console.log(`Updated ${group.querySelector('label').textContent} to ${span.textContent}`);
            });
        }
    });

    // Close edit mode if user clicks outside
    document.addEventListener('click', function (event) {
        if (!coursesSection.contains(event.target) && editCourseBtn.textContent === 'Save Changes') {
            // Revert changes and exit edit mode
            editCourseBtn.textContent = 'Edit Course';
            editCourseBtn.classList.remove('editing');
            infoGroups.forEach(group => {
                const input = group.querySelector('input');
                if (input) {
                    const span = document.createElement('span');
                    span.textContent = input.defaultValue; // Use the original value
                    input.replaceWith(span);
                }
            });
        }
    });
});
//edit button for achievement
document.addEventListener('DOMContentLoaded', function () {
    const achievementsSection = document.getElementById('achievements');
    const editAchievementsBtn = achievementsSection.querySelector('.edit-achievements-btn');
    const addAchievementBtn = achievementsSection.querySelector('.add-achievement-btn');
    const deleteAchievementBtn = achievementsSection.querySelector('.delete-achievement-btn');
    const achievementsContainer = achievementsSection.querySelector('.achievements-container');

    let isEditMode = false;

    editAchievementsBtn.addEventListener('click', toggleEditMode);
    addAchievementBtn.addEventListener('click', addNewAchievement);
    deleteAchievementBtn.addEventListener('click', deleteSelectedAchievements);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            editAchievementsBtn.textContent = 'Save Changes';
            editAchievementsBtn.classList.add('editing');
            addAchievementBtn.style.display = 'inline-block';
            deleteAchievementBtn.style.display = 'inline-block';
            enableEditMode();
        } else {
            editAchievementsBtn.textContent = 'Edit Achievements';
            editAchievementsBtn.classList.remove('editing');
            addAchievementBtn.style.display = 'none';
            deleteAchievementBtn.style.display = 'none';
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

            if (!item.querySelector('.delete-checkbox')) {
                const deleteCheckbox = document.createElement('input');
                deleteCheckbox.type = 'checkbox';
                deleteCheckbox.className = 'delete-checkbox';
                item.insertBefore(deleteCheckbox, item.firstChild);
            }
        });
    }

    function saveChanges() {
        const items = achievementsContainer.querySelectorAll('.achievement-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const editMediaBtn = item.querySelector('.edit-media-btn');
            const deleteCheckbox = item.querySelector('.delete-checkbox');

            h3.contentEditable = false;
            p.contentEditable = false;
            h3.classList.remove('editable');
            p.classList.remove('editable');

            if (editMediaBtn) {
                editMediaBtn.remove();
            }
            if (deleteCheckbox) {
                deleteCheckbox.remove();
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

            const deleteCheckbox = document.createElement('input');
            deleteCheckbox.type = 'checkbox';
            deleteCheckbox.className = 'delete-checkbox';
            newItem.insertBefore(deleteCheckbox, newItem.firstChild);
        }
    }

    function deleteSelectedAchievements() {
        if (!isEditMode) {
            alert('Please enter edit mode to delete achievements.');
            return;
        }

        const selectedItems = achievementsContainer.querySelectorAll('.delete-checkbox:checked');
        if (selectedItems.length === 0) {
            alert('Please select at least one achievement to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete the selected achievement(s)?')) {
            selectedItems.forEach(checkbox => {
                checkbox.closest('.achievement-item').remove();
            });
            // Here you would typically send an AJAX request to update the server
            console.log('Deleted selected achievements');
        }
    }
});

//competition editing

document.addEventListener('DOMContentLoaded', function () {
    const competitionsSection = document.getElementById('competitions');
    const editCompetitionsBtn = competitionsSection.querySelector('.edit-competitions-btn');
    const addCompetitionBtn = competitionsSection.querySelector('.add-competition-btn');
    const deleteCompetitionBtn = competitionsSection.querySelector('.delete-competition-btn');
    const competitionsContainer = competitionsSection.querySelector('.competitions-container');

    let isEditMode = false;

    editCompetitionsBtn.addEventListener('click', toggleEditMode);
    addCompetitionBtn.addEventListener('click', addNewCompetition);
    deleteCompetitionBtn.addEventListener('click', deleteSelectedCompetitions);

    function toggleEditMode() {
        isEditMode = !isEditMode;
        if (isEditMode) {
            editCompetitionsBtn.textContent = 'Save Changes';
            editCompetitionsBtn.classList.add('editing');
            addCompetitionBtn.style.display = 'inline-block';
            deleteCompetitionBtn.style.display = 'inline-block';
            enableEditMode();
        } else {
            editCompetitionsBtn.textContent = 'Edit Competitions';
            editCompetitionsBtn.classList.remove('editing');
            addCompetitionBtn.style.display = 'none';
            deleteCompetitionBtn.style.display = 'none';
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

            if (!item.querySelector('.delete-checkbox')) {
                const deleteCheckbox = document.createElement('input');
                deleteCheckbox.type = 'checkbox';
                deleteCheckbox.className = 'delete-checkbox';
                item.insertBefore(deleteCheckbox, item.firstChild);
            }
        });
    }

    function saveChanges() {
        const items = competitionsContainer.querySelectorAll('.competition-item');
        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');
            const editMediaBtn = item.querySelector('.edit-media-btn');
            const deleteCheckbox = item.querySelector('.delete-checkbox');

            h3.contentEditable = false;
            p.contentEditable = false;
            h3.classList.remove('editable');
            p.classList.remove('editable');

            if (editMediaBtn) {
                editMediaBtn.remove();
            }
            if (deleteCheckbox) {
                deleteCheckbox.remove();
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

            const deleteCheckbox = document.createElement('input');
            deleteCheckbox.type = 'checkbox';
            deleteCheckbox.className = 'delete-checkbox';
            newItem.insertBefore(deleteCheckbox, newItem.firstChild);
        }
    }

    function deleteSelectedCompetitions() {
        if (!isEditMode) {
            alert('Please enter edit mode to delete competitions.');
            return;
        }

        const selectedItems = competitionsContainer.querySelectorAll('.delete-checkbox:checked');
        if (selectedItems.length === 0) {
            alert('Please select at least one competition to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete the selected competition(s)?')) {
            selectedItems.forEach(checkbox => {
                checkbox.closest('.competition-item').remove();
            });
            // Here you would typically send an AJAX request to update the server
            console.log('Deleted selected competitions');
        }
    }
});