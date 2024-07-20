document.addEventListener('DOMContentLoaded', (event) => {
    // متغير لتتبع اللغة الحالية
    let currentLang = navigator.language.startsWith('ar') ? 'ar' : 'en';

    // دالة لتحميل اللغة بناءً على التفضيل
    const loadLanguage = (lang) => {
        fetch(`../json/${lang}.json`)
            .then(response => response.json())
            .then(data => {
                const classes = {
                    'ShamCash': data.ShamCash,
                    'AboutApp': data.AboutApp,
                    'SectionOneP': data.SectionOneP,
                    'SectionTwoP': data.SectionTwoP,
                    'SectionThreeP': data.SectionThreeP,
                    'SectionFourP': data.SectionFourP,
                    'SectionFiveP': data.SectionFiveP,
                    'Android': data.Android,
                    'Ios': data.Ios,
                    'Windows': data.Windows,
                    'Linux': data.Linux,
                    'ComingSoon': data.ComingSoon,
                    'MainText': data.MainText,
                    'NotifyMe': data.NotifyMe,
                    'Copyright': data.Copyright,
                    'downbutton': data.downbutton
                };

                // تحديث محتوى الصفحة باللغة الجديدة
                for (let className in classes) {
                    let elements = document.querySelectorAll(`.${className}`);
                    elements.forEach(element => {
                        element.textContent = classes[className];
                    });
                }
            })
            .catch(error => console.error('Error loading language file:', error));
    };

    // تحميل اللغة بناءً على إعدادات المتصفح
    loadLanguage(currentLang);

    // إضافة عنصر span لتبديل اللغة
    const langToggleSpan = document.createElement('span');
    langToggleSpan.id = 'toggleLangSpan';
    langToggleSpan.style.cursor = 'pointer';
    langToggleSpan.style.position = 'relative';
    langToggleSpan.style.top = '8px';
    langToggleSpan.style.right = '30px';
    langToggleSpan.style.color = 'white';
    langToggleSpan.style.color = 'white';
    langToggleSpan.style.userSelect = 'none';
    langToggleSpan.textContent = (currentLang === 'ar') ? 'English' : 'العربية';
    document.getElementById('lang-toggle').appendChild(langToggleSpan);

    // تبديل السمات المظلمة والفاتحة
    const toggleSwitch = document.getElementById('dark-mode');
    const toggleThemeClasses = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        const logoImage = document.querySelector('.imglogo');
        if (theme === 'dark') {
            logoImage.src = '/Assets/applogo.svg';
        } else {
            logoImage.src = '/Assets/applogo2.svg';
        }
    };

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = prefersDarkScheme ? 'dark' : 'light';
    toggleThemeClasses(currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            toggleThemeClasses('dark');
        } else {
            toggleThemeClasses('light');
        }
    });

    // تحديث حالة الزر بناءً على اختيار المستخدم
    document.getElementById('inputGroupSelect04').addEventListener('change', function() {
        var selectedValue = this.value;
        var button = document.getElementById('actionButton');

        if (selectedValue == '2' || selectedValue == '3' || selectedValue == '4') {
            button.textContent = (currentLang === 'ar') ? 'قريباً' : 'Soon';
            button.disabled = true;
        } else {
            button.textContent = (currentLang === 'ar') ? 'تحميل' : 'Download';
            button.disabled = false;
        }
    });

    // تبديل اللغة يدويًا باستخدام span
    document.getElementById('toggleLangSpan').addEventListener('click', function() {
        currentLang = (currentLang === 'ar') ? 'en' : 'ar';
        loadLanguage(currentLang);

        // تحديث نص span لتظهر اللغة التالية
        this.textContent = (currentLang === 'ar') ? 'English' : 'العربية';
    });

    document.getElementById('actionButton').addEventListener('click', function() {
        var selectedValue = document.getElementById('inputGroupSelect04').value;

        if (selectedValue == '1') {
            window.location.href = 'https://shamcash.com/downloads/shamcash.apk'; 
        }
    });
});
