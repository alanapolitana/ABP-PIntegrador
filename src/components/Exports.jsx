export const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const rows = data.map(obj =>
        headers.map(header => {
            const val = obj[header];
            return `"${(val !== null && val !== undefined ? String(val).replace(/"/g, '""') : "")}"`;
        }).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
};


export const triggerDownload = (url, filename) => {
    //crear el hipervinculo
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    //Agregamos el anchor tag en el DOM
    document.body.appendChild(link);
    //Simulas el click en el elemento
    link.click();
    //Eliminar el elemento anchor
    document.body.removeChild(link);
};

export const handleExport = (format, data) => {
    if (!format || !data || data.length === 0) {
        alert("No hay datos o formato seleccionado.");
        return;
    }

    if (format === "json") {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "productos.json");
    } else if (format === "csv") {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "productos.csv");
    } else if (format === "excel") {
        const table = convertToCSV(data);
        const blob = new Blob([table], {
            type: "application/vnd.ms-excel",
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, "productos.xls");
    } else {
        alert("Selecciona un formato de exportación válido.");
    }
};


