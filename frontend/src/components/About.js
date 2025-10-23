import React from 'react'
import { Link } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const About = () =>{
    return(
        <>
       <section className="page-heading">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="header-text">
                    <h1>Про проект</h1>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section className="get-info">
            <div className="container">
            <div className="row">
                        <div class="col-lg-6">
                        <div className="section-heading">
                            <h4><em>Контакти</em></h4>
                            <GitHubIcon/><Link to={'https://github.com/MrAnt22'}><h2>GitHub</h2></Link>
                            <br/>
                            <EmailIcon/><Link to={'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=jrjtXJTzrCrQWptMcnZkFMtknHFXMgqVRwNBdPMjbrHmKkvxrszxVhjVVDCGLxNmvDZMWchP'}><h2>Пошта</h2></Link>
                        </div>
                        </div>
                <div className="col-lg-6 align-self-center">
                <div className="section-heading">
                    <h6>Навіщо це?</h6>
                    <h4>Про <em>Функціональність</em></h4>
                    <p>Портфоліо студента в першу чергу необхідний самому студенту: оцінити свої навички, розказати про себе, переглянути свої проекти і поділитися своїм портфоліо з іншими - все це можна зробити <b><Link to='/'>тут.</Link></b> <br/>
                    На сайті можна вказати посилання на LinkedIn та GitHub з якого беруться ваші проекти і впорядковуються за 'зірочками' з GitHub. Також, оскільки напрямок цього сайту - це студенти кафедри ІПЗЕ, то можна вказати ваш рік навчання та групу.</p>
                </div>
                <hr/>
                <div className="section-heading">
                    <h6>Що використано?</h6>
                    <h4>Про <em>розробку</em></h4>
                    
                    <p>Для цього проекту я використав <b>React</b> + <b>Django</b> стек з інтеграцію бази даних - <b>PostgreSQL</b>. Для вигляду і дизайну використав <b><Link to='https://themewagon.github.io/eduwell/index.html'>Startbootstrap</Link></b>.<br/>
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                    <div className="info-item">
                        <div className="icon">
                        <img src="assets/images/python-icon.png" alt="" />
                        </div>
                        <h4>Backend</h4>
                        <p>Для обміну даних з фронтендом використав Django REST Framework. Для повноцінного використання сайту користувачу необхідно авторизуватися. Після авторизації користувач берігається в базі даних і йому повертають токени авторизації, які ідентифікують користувача.<br/>
                        Усі зміни зберігаються в бд через ендпоінти</p>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="info-item">
                        <div className="icon">
                        <img src="assets/images/react-icon.png" alt="" />
                        </div>
                        <h4>Frontend</h4>
                        <p>Фронтенд побудований на React і використовує Context API для зберігання даних користувача.<br/>
                        Axios відповідає за всі HTTP-запити, а якщо термін дії токена завершується, він автоматично оновлюється</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
        

    )
}

export default About