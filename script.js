// Kunci Jawaban untuk soal pilihan ganda (Soal 1-30)
const answerKey = {
    q1: 'A', q2: 'B', q3: 'B', q4: 'C', q5: 'A',
    q6: 'A', q7: 'B', q8: 'C', q9: 'A', q10: 'B',
    q11: 'B', q12: 'B', q13: 'A', q14: 'B', q15: 'C',
    q16: 'B', q17: 'A', q18: 'A', q19: 'B', q20: 'A',
    q21: 'B', q22: 'B', q23: 'B', q24: 'A', q25: 'B',
    q26: 'A', q27: 'C', q28: 'A', q29: 'B', q30: 'A',
    // Soal 31-35 dan Uraian tidak masuk dalam kunci jawaban interaktif ini.
};

// Ambil semua elemen label yang merupakan pilihan jawaban
const optionLabels = document.querySelectorAll('.options label');

// Tambahkan event listener untuk setiap label
optionLabels.forEach(label => {
    label.addEventListener('click', handleOptionClick);
});

function handleOptionClick(event) {
    const clickedLabel = event.target;
    const questionId = clickedLabel.dataset.questionId; // Ambil ID soal dari data attribute
    const selectedAnswer = clickedLabel.dataset.answer; // Ambil jawaban yang dipilih (A, B, C, D)

    const correctAnswer = answerKey[questionId]; // Ambil jawaban yang benar dari kunci

    // Temukan elemen feedback untuk soal ini
    const questionElement = document.querySelector(`.question[data-id="${questionId}"]`);
    const feedbackElement = questionElement.querySelector('.feedback');

    // Pastikan feedbackElement ditemukan
    if (!feedbackElement) {
        console.error(`Feedback element not found for question ${questionId}`);
        return;
    }

    // Hapus class feedback sebelumnya
    feedbackElement.classList.remove('correct', 'incorrect');
    feedbackElement.style.display = 'block'; // Tampilkan feedback

    // Logika pengecekan jawaban
    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = 'Selamat, jawaban Anda benar!';
        feedbackElement.classList.add('correct');
    } else {
        feedbackElement.textContent = `Maaf, jawaban Anda salah. Jawaban yang benar adalah ${correctAnswer}.`;
        feedbackElement.classList.add('incorrect');
    }

    // Nonaktifkan label pilihan lain untuk soal ini setelah dijawab
    const optionsForQuestion = questionElement.querySelectorAll('.options label');
    optionsForQuestion.forEach(opt => {
        opt.style.pointerEvents = 'none'; // Nonaktifkan klik
        // Opsional: Beri tanda visual pada pilihan
        if (opt.dataset.answer === selectedAnswer) {
             if (selectedAnswer === correctAnswer) {
                 opt.classList.add('selected-correct'); // Tandai pilihan yang benar (jika dipilih)
             } else {
                 opt.classList.add('selected-incorrect'); // Tandai pilihan yang salah (jika dipilih)
             }
        }
        // Tandai jawaban yang benar (walaupun tidak dipilih)
        if (opt.dataset.answer === correctAnswer && selectedAnswer !== correctAnswer) {
            opt.classList.add('selected-correct');
        }
    });
}