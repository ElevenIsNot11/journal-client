import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Переводит компонент в состояние ошибки
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логирует ошибку в консоль, если она произошла
    console.error(error, errorInfo); 
  
    // Перенаправляет на ErrorPage с подробной информацией об ошибке
    this.setState({ hasError: true, error }); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage error={this.state.error} /> 
      );
    }

    // Отображает содержимое компонента, если он в нормальном состоянии
    return this.props.children; 
  }
}

export default ErrorBoundary; 