import React from 'react';

function ErrorPage(props) {
    const { error } = props;

    return (
      <div>
        <h1>Произошла ошибка!</h1>
        <p>Код ошибки: {error.code || error.status}</p>
        <p>Сообщение: {error.message || error.statusText}</p>
        <p>Попробуйте обновить страницу или связаться с нами.</p>
      </div>
    );
}

export default ErrorPage;