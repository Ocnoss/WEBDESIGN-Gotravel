from datetime import datetime
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import pymysql

pymysql.install_as_MySQLdb()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://csproject:gotravel@localhost:3306/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'gotravel'
db = SQLAlchemy(app)
login_manager = LoginManager()


class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class History(db.Model):
    __tablename__ = "history"
    id = db.Column(db.Integer, primary_key=True)
    page = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


with app.app_context():
    db.create_all()
    db.session.commit()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/london')
def london():
    return render_template('london.html')


@app.route('/beijing')
def beijing():
    return render_template('beijing.html')


@app.route('/dusanbe')
def dusanbe():
    return render_template('dusanbe.html')


@app.route('/newyork')
def newyork():
    return render_template('newyork.html')


@app.route('/shanghai')
def shanghai():
    return render_template('shanghai.html')


@app.route('/tokyo')
def tokyo():
    return render_template('tokyo.html')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/register', methods=['GET', 'POST'])  # 注册页路由
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        if User.query.filter_by(username=username).first():
            return jsonify({'message': '用户名已被占用'}), 400

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': '注册成功'}), 200

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])  # 登录页
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return jsonify({'message': '登录成功', 'status': 200})
        return jsonify({'message': '密码错误', 'status': 400})
    return render_template('login.html')


@app.route('/user/<int:user_id>')  # 个人页面路由
@login_required
def personal_page():
    return 'Welcome to personal page'


@app.route('/logout')  # logout
@login_required
def logout():
    logout_user()
    return jsonify({'message': '成功登出'}), 200


@app.route('/comment', methods=['POST'])
@login_required
def comment():
    content = request.form['content']
    user_id = current_user.id

    new_comment = Comment(content=content, user_id=user_id)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'message': '评论成功'})


@app.route('/record', methods=['POST'])
@login_required
def record():
    page = request.form['page']
    user_id = current_user.id

    new_record = History(page=page, user_id=user_id)
    db.session.add(new_record)
    db.session.commit()
    return


@app.route('/api/user/history', methods=['GET'])
def get_user_history():
    user_history = {
        'comments': ['Comment 1', 'Comment 2', 'Comment 3'],
        'browsing_history': ['Page 1', 'Page 2', 'Page 3']
    }
    return jsonify(user_history)


if __name__ == '__main__':
    app.run()
