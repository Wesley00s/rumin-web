document.addEventListener('DOMContentLoaded', function () {
    const Reb = () => {

        const labels = ["1", "2", "3", "4", "5"];
        const labelsContainer = document.querySelector('.labels'); 

        const doLabels = () => {
            labels.forEach((label, index) => {
                const labelElement = document.createElement('label');
                labelElement.key = index; 

                const inputElement = document.createElement('input');
                inputElement.id = `label-${index}`;
                inputElement.type = "text";
                inputElement.readOnly = true;
                inputElement.value = label;

                labelElement.appendChild(inputElement);
                labelsContainer.appendChild(labelElement);
            });
        };

        doLabels();
    };

    Reb();

});