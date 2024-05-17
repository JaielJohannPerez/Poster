var image = document.getElementById('centeredImage');
var squaresSets = [
    ["Acknowledgement", "References", "Conclusions", "Results & Findings", "Introduction", "Research Questions"], // Texts for the first set of squares
];
var squares = [];
var isSquaresVisible = false;
var currentSet = 0; // Index of the currently displayed set
var radius = 300; // Radius of the circle around the image

// Function to toggle squares visibility
function toggleSquares() {
    isSquaresVisible = !isSquaresVisible;

    // Toggle visibility and animation of squares
    squares.forEach(function(square, index) {
        // Calculate angle for each square
        var angle = (index * Math.PI * 2) / squares.length; // Angle in radians
        var x = Math.cos(angle) * radius; // X coordinate
        var y = Math.sin(angle) * radius; // Y coordinate

        // Set square position
        square.style.transform = isSquaresVisible ? `translate(${x}px, ${y}px)` : 'translate(0, 0)';
        square.style.opacity = isSquaresVisible ? '1' : '0'; // Fade in/out squares

        // Set square text
        square.textContent = squaresSets[currentSet][index];

        // Set data-modal-id attribute
        square.setAttribute('data-modal-id', 'modal' + index);
        square.style.pointerEvents = isSquaresVisible ? 'auto' : 'none';
    });
}

// Function to open the modal dialog with animation
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'flex'; // Display the modal dialog
    // Trigger reflow to apply initial opacity transition
    modal.offsetHeight;
    modal.style.opacity = '1'; // Fade in the modal dialog
}

// Function to close the modal dialog
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.opacity = '0'; // Fade out the modal dialog
    // Hide the modal after the transition ends
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500); // Adjust the delay to match the transition duration
}

// Add click event listener to the image
image.addEventListener('click', function() {
    // Add bouncing effect by scaling up and down
    image.style.transform = 'scale(1.1)';
    // Set a timeout to reset the transform after a short delay
    setTimeout(function() {
        image.style.transform = 'scale(1)';
    }, 300); // Adjust the delay (in milliseconds) as needed

    // Toggle squares visibility
    toggleSquares();
});

// Create and position squares
for (var i = 0; i < squaresSets[currentSet].length; i++) {
    var square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', function() {
        var modalId = 'modal' + (parseInt(this.getAttribute('data-modal-index')) + 1); // Adding 1 to the index for modal ID
        openModal(modalId);
    }); // Attach click event listener to each square
    square.setAttribute('data-modal-index', i); // Set data-modal-index attribute
    document.body.appendChild(square);
    squares.push(square);
}

// Initially hide squares
toggleSquares();
