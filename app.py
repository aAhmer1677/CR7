from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'CR7_ABDULLAH'
DATA_FILE = 'data.txt'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form.get('fullName', '')
        email = request.form.get('email', '')
        message = request.form.get('message', '')

        print(f"INDEX FORM: Name: {name}, Email: {email}, Message: {message}")
        
        if name and email and message:
            with open(DATA_FILE, 'a') as f:
                f.write(f"Name: {name}\nEmail: {email}\nMessage: {message}\n{'='*40}\n")
            flash('Thank you! Your message has been sent.', 'success')
        
        return redirect(url_for('index'))
    
    return render_template('index.html')

@app.route('/contact-us', methods=['GET', 'POST'])
def contact_us():
    if request.method == 'POST':
        print("=== CONTACT FORM SUBMITTED ===")
        print(f"Request method: {request.method}")
        print(f"Form data: {dict(request.form)}")
        
        name = request.form.get('fullName', '')
        email = request.form.get('email', '')
        message = request.form.get('message', '')
        
        print(f"Name: '{name}'")
        print(f"Email: '{email}'")
        print(f"Message: '{message}'")
        
        if not name or not email or not message:
            print("ERROR: Missing form data!")
            flash('Please fill in all fields.', 'error')
        else:
            try:
                with open(DATA_FILE, 'a') as f:
                    f.write(f"Name: {name}\nEmail: {email}\nMessage: {message}\n{'='*40}\n")
                print(f"SUCCESS: Data written to {DATA_FILE}")
                flash('Thank you! Your message has been sent. Abdullah will try his best to get back to you.', 'success')
            except Exception as e:
                print(f"ERROR writing to file: {e}")
                flash('Error saving your message. Please try again.', 'error')
        
        return redirect(url_for('contact_us'))
    
    return render_template('contact-us.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/goat')
def goat():
    return render_template('goat.html')

@app.route('/legacy')
def legacy():
    return render_template('legacy.html')

@app.route('/stats')
def stats():
    return render_template('stats.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)