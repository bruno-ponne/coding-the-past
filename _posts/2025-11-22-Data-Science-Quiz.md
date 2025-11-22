---
layout: post_minimal
title: Data Science Quiz For Humanities
tags: r statistics python
image: lesson_30.jpg
abstract: Test your skills with this interactive data science quiz covering statistics, Python, R, and data analysis.
keywords: r, data science quiz, statistics, python
description: Test your skills with this interactive data science quiz covering statistics, Python, R, and data analysis. Perfect for beginners and advanced learners.
last_modified_at: 22-Nov-25
---
Test your skills with this interactive data science quiz covering statistics, Python, R, and data analysis. 



<div class="quiz-container">
  <style>
    .quiz-container { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; max-width: 900px; margin: 2rem auto; padding: 1.25rem; }
    .meta { text-align: center; color: #555; margin-bottom: 1.25rem; }
    .progress-wrap { background:#eee; border-radius:999px; overflow:hidden; height:14px; margin-bottom:1rem; box-shadow: inset 0 1px 2px rgba(0,0,0,0.03); }
    .progress-bar { height:100%; width:0%; transition: width 450ms cubic-bezier(.2,.8,.2,1); background: linear-gradient(90deg,#4f46e5,#06b6d4); }
    .question { background:#fbfdff; border:1px solid #eef2ff; padding:14px; border-radius:12px; margin-bottom:14px; box-shadow: 0 1px 2px rgba(13,17,25,0.03); }
    .q-head { display:flex; justify-content:space-between; align-items:center; gap:12px; }
    .q-num { background:#eef2ff; color:#3730a3; padding:6px 10px; border-radius:999px; font-weight:600; font-size:0.9rem; }
    .options label { display:block; margin:8px 0; padding:8px 10px; border-radius:8px; cursor:pointer; transition: background 180ms, transform 120ms; }
    .options input { margin-right:8px; }
    .options label:hover { transform: translateY(-2px); }
    .correct { background: #ecfdf5; border:1px solid #bbf7d0; }
    .incorrect { background: #ffefef; border:1px solid #fca5a5; }
    .muted { color:#666; font-size:0.9rem; }
    .controls { display:flex; gap:12px; justify-content:flex-end; align-items:center; margin-top:12px; }
    button.primary { background:#4f46e5; color:white; border:none; padding:10px 16px; border-radius:10px; cursor:pointer; font-weight:600; }
    button.ghost { background:transparent; border:1px solid #e5e7eb; padding:8px 12px; border-radius:10px; cursor:pointer; }
    #result { margin-top:16px; font-size:1.05rem; font-weight:700; text-align:center; }
    .explanation { margin-top:8px; font-size:0.95rem; color:#0f172a; }
    .fade-in { animation: fadeIn 380ms ease both; }
    @keyframes fadeIn { from { opacity:0; transform: translateY(6px);} to {opacity:1; transform:none;} }
  </style>

  Progress

  <br>
  
  <div class="progress-wrap" aria-hidden="true">
    <div id="progressBar" class="progress-bar" style="width:0%"></div>
  </div>
  <div class="muted" id="progressText">Answered 0 of 15</div>

  <form id="quizForm" class="fade-in">

    <!-- Questions 1–15 -->

    <!-- 1 -->
    <section class="question" data-q="q1">
      <div class="q-head"><div class="q-num">1</div><div class="q-title"><strong>Which of the following best describes a z-score?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q1" value="A"> A measure of central tendency</label>
        <label><input type="radio" name="q1" value="B"> The number of standard deviations a value is from the mean</label>
        <label><input type="radio" name="q1" value="C"> The square of the correlation coefficient</label>
        <label><input type="radio" name="q1" value="D"> A type of probability distribution</label>
      </div>
    </section>

    <!-- 2 -->
    <section class="question" data-q="q2">
      <div class="q-head"><div class="q-num">2</div><div class="q-title"><strong>What is the main advantage of using tidy data principles in R?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q2" value="A"> Increased computation speed</label>
        <label><input type="radio" name="q2" value="B"> Easier visualization and consistent analysis</label>
        <label><input type="radio" name="q2" value="C"> Reduced memory usage</label>
        <label><input type="radio" name="q2" value="D"> Automatically removes missing values</label>
      </div>
    </section>

    <!-- 3 -->
    <section class="question" data-q="q3">
      <div class="q-head"><div class="q-num">3</div><div class="q-title"><strong>In Python, which library is most commonly used for data manipulation?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q3" value="A"> matplotlib</label>
        <label><input type="radio" name="q3" value="B"> numpy</label>
        <label><input type="radio" name="q3" value="C"> pandas</label>
        <label><input type="radio" name="q3" value="D"> statsmodels</label>
      </div>
    </section>

    <!-- 4 -->
    <section class="question" data-q="q4">
      <div class="q-head"><div class="q-num">4</div><div class="q-title"><strong>Which metric is best for evaluating a classification model on imbalanced data?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q4" value="A"> Accuracy</label>
        <label><input type="radio" name="q4" value="B"> Recall</label>
        <label><input type="radio" name="q4" value="C"> Variance</label>
        <label><input type="radio" name="q4" value="D"> R-squared</label>
      </div>
    </section>

    <!-- 5 -->
    <section class="question" data-q="q5">
      <div class="q-head"><div class="q-num">5</div><div class="q-title"><strong>In a linear regression, what does R² represent?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q5" value="A"> Slope of the regression line</label>
        <label><input type="radio" name="q5" value="B"> Variance explained by the model</label>
        <label><input type="radio" name="q5" value="C"> Covariance between variables</label>
        <label><input type="radio" name="q5" value="D"> Degree of overfitting</label>
      </div>
    </section>

    <!-- 6 -->
    <section class="question" data-q="q6">
      <div class="q-head"><div class="q-num">6</div><div class="q-title"><strong>In historical or humanities datasets, which challenge occurs most frequently?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q6" value="A"> Excessively large sample sizes</label>
        <label><input type="radio" name="q6" value="B"> Perfectly standardized variable names</label>
        <label><input type="radio" name="q6" value="C"> Missing or incomplete records</label>
        <label><input type="radio" name="q6" value="D"> Highly structured relational databases</label>
      </div>
    </section>

    <!-- 7 -->
    <section class="question" data-q="q7">
      <div class="q-head"><div class="q-num">7</div><div class="q-title"><strong>What does the <code>groupby()</code> function do in pandas?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q7" value="A"> Sorts values by category</label>
        <label><input type="radio" name="q7" value="B"> Applies aggregate operations to subsets of data</label>
        <label><input type="radio" name="q7" value="C"> Removes duplicates</label>
        <label><input type="radio" name="q7" value="D"> Normalizes columns</label>
      </div>
    </section>

    <!-- 8 -->
    <section class="question" data-q="q8">
      <div class="q-head"><div class="q-num">8</div><div class="q-title"><strong>What is the primary purpose of cross-validation?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q8" value="A"> Increase training accuracy</label>
        <label><input type="radio" name="q8" value="B"> Test different loss functions</label>
        <label><input type="radio" name="q8" value="C"> Evaluate a model on unseen data to reduce overfitting</label>
        <label><input type="radio" name="q8" value="D"> Speed up model training</label>
      </div>
    </section>

    <!-- 9 -->
    <section class="question" data-q="q9">
      <div class="q-head"><div class="q-num">9</div><div class="q-title"><strong>Feature engineering refers to:</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q9" value="A"> Training a model with more iterations</label>
        <label><input type="radio" name="q9" value="B"> Preparing input variables to improve model performance</label>
        <label><input type="radio" name="q9" value="C"> Removing outliers</label>
        <label><input type="radio" name="q9" value="D"> Selecting the best model</label>
      </div>
    </section>

    <!-- 10 -->
    <section class="question" data-q="q10">
      <div class="q-head"><div class="q-num">10</div><div class="q-title"><strong>Which visualization is most appropriate for the distribution of a continuous variable?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q10" value="A"> Bar chart</label>
        <label><input type="radio" name="q10" value="B"> Histogram</label>
        <label><input type="radio" name="q10" value="C"> Pie chart</label>
        <label><input type="radio" name="q10" value="D"> Line plot</label>
      </div>
    </section>

    <!-- 11 -->
    <section class="question" data-q="q11">
      <div class="q-head"><div class="q-num">11</div><div class="q-title"><strong>A z-score of +2.5 means:</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q11" value="A"> The value is below the mean</label>
        <label><input type="radio" name="q11" value="B"> The value is 2.5 SD above the mean</label>
        <label><input type="radio" name="q11" value="C"> The value is an outlier</label>
        <label><input type="radio" name="q11" value="D"> The standard deviation is 2.5</label>
      </div>
    </section>

    <!-- 12 -->
    <section class="question" data-q="q12">
      <div class="q-head"><div class="q-num">12</div><div class="q-title"><strong>Which is an advantage of using R for statistical analysis?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q12" value="A"> Native GPU acceleration</label>
        <label><input type="radio" name="q12" value="B"> Strong statistical libraries and ggplot2</label>
        <label><input type="radio" name="q12" value="C"> Automatic machine learning</label>
        <label><input type="radio" name="q12" value="D"> Faster than Python</label>
      </div>
    </section>

    <!-- 13 -->
    <section class="question" data-q="q13">
      <div class="q-head"><div class="q-num">13</div><div class="q-title"><strong>Normalization in data preprocessing means:</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q13" value="A"> Converting categorical data to numeric</label>
        <label><input type="radio" name="q13" value="B"> Rescaling values to a standard range like 0–1</label>
        <label><input type="radio" name="q13" value="C"> Detecting outliers</label>
        <label><input type="radio" name="q13" value="D"> Filling missing values</label>
      </div>
    </section>

    <!-- 14 -->
    <section class="question" data-q="q14">
      <div class="q-head"><div class="q-num">14</div><div class="q-title"><strong>Why may historical datasets be biased?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q14" value="A"> They always include all records</label>
        <label><input type="radio" name="q14" value="B"> Selective or incomplete record-keeping</label>
        <label><input type="radio" name="q14" value="C"> Automatic modern data collection</label>
        <label><input type="radio" name="q14" value="D"> Perfect measurement systems</label>
      </div>
    </section>

    <!-- 15 -->
    <section class="question" data-q="q15">
      <div class="q-head"><div class="q-num">15</div><div class="q-title"><strong>Which Python function can compute a z-score?</strong></div></div>
      <div class="options">
        <label><input type="radio" name="q15" value="A"> pandas.normalize()</label>
        <label><input type="radio" name="q15" value="B"> scipy.stats.zscore()</label>
        <label><input type="radio" name="q15" value="C"> numpy.z()</label>
        <label><input type="radio" name="q15" value="D"> matplotlib.stats()</label>
      </div>
    </section>

    <div class="controls">
      <button type="button" id="submitBtn" class="primary">Submit Quiz</button>
      <button type="button" id="resetBtn" class="ghost">Try again</button>
    </div>

    <div id="result" role="status" aria-live="polite"></div>

  </form>

  <script>
    (function(){
      const answers = {
        q1: 'B', q2: 'B', q3: 'C', q4: 'B', q5: 'B',
        q6: 'C', q7: 'B', q8: 'C', q9: 'B', q10: 'B',
        q11: 'B', q12: 'B', q13: 'B', q14: 'B', q15: 'B'
      };

      const total = Object.keys(answers).length;
      const form = document.getElementById('quizForm');
      const submitBtn = document.getElementById('submitBtn');
      const resetBtn = document.getElementById('resetBtn');
      const resultEl = document.getElementById('result');
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');

      function updateProgress(){
        const answered = Array.from(form.querySelectorAll('input[type=radio]'))
          .filter(i => i.checked)
          .map(i => i.name);
        // unique question names answered
        const unique = new Set(answered);
        const n = unique.size;
        const pct = Math.round((n/total)*100);
        progressBar.style.width = pct + '%';
        progressText.textContent = `Answered ${n} of ${total}`;
      }

      // update progress when any radio changes
      form.addEventListener('change', updateProgress);

      function showAnswers(){
        let score = 0;
        for(const q in answers){
          const correct = answers[q];
          const selector = `input[name="${q}"]`;
          const inputs = Array.from(document.querySelectorAll(selector));
          const chosen = inputs.find(i => i.checked);

          inputs.forEach(i => {
            const label = i.parentElement;
            label.classList.remove('correct','incorrect');
            // highlight correct option
            if(i.value === correct){
              label.classList.add('correct');
            }
          });

          if(chosen){
            if(chosen.value === correct){ score++; }
            else {
              // mark chosen wrong option red
              chosen.parentElement.classList.add('incorrect');
            }
          }
        }

        // Disable all inputs after submission
        form.querySelectorAll('input[type=radio]').forEach(i => i.disabled = true);

        // show score with a friendly message
        resultEl.innerHTML = `You scored <strong>${score} / ${total}</strong>.` + (score === total ? ' Brilliant! 🎉' : ' Nice attempt — review the highlighted answers.');

        // Reveal short explanations (kept brief for the blog)
        addExplanations();
      }

      function addExplanations(){
        const explanations = {
          q1: 'A z-score measures how many standard deviations a value is from the mean.',
          q2: 'Tidy data makes it easier to visualize and analyze because each variable is a column and each observation a row.',
          q3: 'pandas is the most common Python library for data manipulation and tabular data.',
          q4: 'Recall is useful on imbalanced datasets because it focuses on correctly identifying the positive class.',
          q5: 'R² indicates how much variance in the dependent variable is explained by the predictors.',
          q6: 'Historical datasets commonly have missing or incomplete records due to preservation and collection practices.',
          q7: 'groupby() groups rows by a key and allows aggregated operations (e.g., sum, mean) per group.',
          q8: 'Cross-validation evaluates model performance on unseen folds to reduce overfitting.',
          q9: 'Feature engineering creates and transforms variables to help models learn patterns better.',
          q10: 'Histograms show the distribution of continuous variables by binning values.',
          q11: 'A z-score of +2.5 is 2.5 standard deviations above the mean.',
          q12: 'R has a rich set of statistical packages and expressive visualization (ggplot2).',
          q13: 'Normalization rescales numeric values, commonly to 0–1, to make features comparable.',
          q14: 'Bias occurs because records may be selective, incomplete, or created under historical constraints.',
          q15: 'scipy.stats.zscore() is a ready-made function; you can also compute (x-mean)/std manually.'
        };

        for(const q in explanations){
          const section = document.querySelector(`section[data-q="${q}"]`);
          if(section && !section.querySelector('.explanation')){
            const div = document.createElement('div');
            div.className = 'explanation';
            div.textContent = explanations[q];
            section.appendChild(div);
          }
        }
      }

      function resetQuiz(){
        // enable inputs and clear checked states
        form.querySelectorAll('input[type=radio]').forEach(i => { i.checked = false; i.disabled = false; i.parentElement.classList.remove('correct','incorrect'); });
        // remove explanations
        form.querySelectorAll('.explanation').forEach(e => e.remove());
        resultEl.textContent = '';
        progressBar.style.width = '0%';
        progressText.textContent = `Answered 0 of ${total}`;
      }

      submitBtn.addEventListener('click', function(){
        // count how many answered
        const answeredCount = new Set(Array.from(form.querySelectorAll('input[type=radio]')).filter(i => i.checked).map(i => i.name)).size;
        if(answeredCount < total){
          if(!confirm(`You have answered ${answeredCount} of ${total}. Submit anyway?`)) return;
        }
        showAnswers();
      });

      document.getElementById('submit-btn').addEventListener('click', function() {
        gtag('event', 'submit_quiz', {
          event_category: 'quiz',
          event_label: 'data_science_quiz'
        });
      });

      resetBtn.addEventListener('click', function(){ if(confirm('Reset the quiz and try again?')) resetQuiz(); });

      // initial progress compute in case some radios are pre-selected
      updateProgress();

    })();
  </script>

</div>
