import React from 'react';

function SKODescription() {
  const skoGrades = [
    {
      grade: "0",
      title: "Tidak ada kontraksi",
      description: "Tidak ada kontraksi otot yang terlihat atau dirasakan, bahkan saat pasien mencoba menggerakkannya.",
      range: "0 mV"
    },
    {
      grade: "1",
      title: "Kontraksi ringan tanpa gerakan",
      description: "Ada sedikit kontraksi otot yang dapat dirasakan atau terlihat, tetapi tidak menghasilkan gerakan.",
      range: "0 - 1.1 mV"
    },
    {
      grade: "2",
      title: "Gerakan tanpa melawan gravitasi",
      description: "Otot mampu bergerak tetapi hanya jika gravitasi dihilangkan (misalnya, saat anggota tubuh didukung oleh pemeriksa).",
      range: "1.1 - 1.85 mV"
    },
    {
      grade: "3",
      title: "Gerakan melawan gravitasi",
      description: "Otot mampu bergerak melawan gravitasi tetapi tidak dapat menahan resistensi tambahan.",
      range: "1.85 - 2.15 mV"
    },
    {
      grade: "4-/4/4+",
      title: "Gerakan melawan gravitasi dan resistensi ringan",
      description: "Otot dapat bergerak melawan gravitasi dan memberikan sedikit kekuatan melawan resistensi.",
      range: "2.15 - 3.8 mV"
    },
    {
      grade: "5",
      title: "Kekuatan normal",
      description: "Otot memiliki kekuatan penuh, sama seperti otot normal pada individu sehat.",
      range: "> 3.8 mV"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">SKO (Skala Kekuatan Otot) Description</h2>
      <div className="grid gap-4">
        {skoGrades.map((grade) => (
          <div key={grade.grade} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-blue-600">Grade {grade.grade}</span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">Range: {grade.range}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{grade.title}</h3>
            <p className="text-gray-600 text-sm">{grade.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SKODescription;