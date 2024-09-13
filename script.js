function getStartDate() {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    
    if (dateParam) {
        const [day, month, year] = dateParam.split('/');
        const date = new Date(year, month - 1, day); // month is 0-indexed
        return isNaN(date.getTime()) ? new Date() : date;
    }
    
    return new Date();
}

function getNextFriday13(startDate) {
    let date = new Date(startDate);
    
    while (true) {
        if (date.getDay() === 5 && date.getDate() === 13) {
            return date;
        }
        date.setDate(date.getDate() + 1);
    }
}

function updateCountdown() {
    const startDate = getStartDate();
    const nextFriday13 = getNextFriday13(startDate);
    const timeDiff = nextFriday13.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    document.getElementById('days').textContent = `Faltan ${daysDiff} días para el próximo viernes 13`;
    
    const formattedDate = nextFriday13.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    document.getElementById('nextFriday13').textContent = `Fecha: ${formattedDate}`;
}

updateCountdown();
setInterval(updateCountdown, 86400000); // Actualizar cada 24 horas