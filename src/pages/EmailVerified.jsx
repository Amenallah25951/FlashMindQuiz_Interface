import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (success === "true") {
      setStatus("success");
      setMessage("Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter.");
    } else if (error) {
      setStatus("error");
      setMessage(decodeURIComponent(error));
    } else {
      setStatus("error");
      setMessage("Lien de vérification invalide ou manquant.");
    }
  }, [searchParams]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleResendVerification = async () => {
    const email = prompt("Veuillez entrer votre adresse email pour recevoir un nouveau lien de vérification:");
    
    if (!email) {
      return;
    }

    try {
      setStatus("loading");
      const response = await fetch("https://flash-mind-quiz-10-jhbu.onrender.com/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Un nouvel email de vérification a été envoyé ! Vérifiez votre boîte de réception.");
      } else {
        setStatus("error");
        setMessage(data.error || "Erreur lors de l'envoi du nouvel email.");
      }
    } catch (error) {
      console.error("Erreur lors du renvoi:", error);
      setStatus("error");
      setMessage("Erreur de connexion. Veuillez réessayer.");
    }
  };

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    @keyframes confetti-fall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    .fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    .bounce {
      animation: bounce 2s infinite;
    }
    .pulse {
      animation: pulse 2s infinite;
    }
    .success-bg {
      background: linear-gradient(135deg, #28a745 0%, #18392B 100%);
    }
    .error-bg {
      background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
    }
    .loading-bg {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .verification-card {
      background: white;
      border-radius: 30px;
      padding: 60px 40px;
      box-shadow: 0 25px 80px rgba(0,0,0,0.3);
      width: 100%;
      max-width: 500px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .verification-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #28a745, #20c997, #28a745);
      background-size: 200% 100%;
      animation: shimmer 3s infinite linear;
    }
    .success-icon {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      margin: 0 auto 30px;
      box-shadow: 0 15px 40px rgba(40, 167, 69, 0.4);
      position: relative;
    }
    .success-icon::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 3px solid rgba(40, 167, 69, 0.2);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    .error-icon {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      margin: 0 auto 30px;
      box-shadow: 0 15px 40px rgba(220, 53, 69, 0.4);
    }
    .loading-icon {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      margin: 0 auto 30px;
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
      animation: spin 2s linear infinite;
    }
    .login-button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 16px 40px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      margin-top: 30px;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }
    .retry-button {
      background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
      color: white;
      border: none;
      padding: 16px 40px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      margin-top: 30px;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(220, 53, 69, 0.4);
    }
    .retry-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(220, 53, 69, 0.6);
    }
    .resend-button {
      background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
      color: white;
      border: none;
      padding: 16px 40px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
      font-weight: 600;
      margin-top: 30px;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
    }
    .resend-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(255, 193, 7, 0.6);
    }
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #ffd700;
      border-radius: 50%;
      animation: confetti-fall 5s linear infinite;
    }
    
    @media (max-width: 768px) {
      .logo-text {
        font-size: 24px !important;
      }
      .logo-circle {
        width: 40px !important;
        height: 40px !important;
        font-size: 22px !important;
      }
      .verification-card {
        padding: 40px 30px !important;
        margin: 20px !important;
      }
    }
    
    @media (max-width: 480px) {
      .logo-container {
        top: 10px !important;
        left: 10px !important;
        gap: 8px !important;
      }
      .logo-text {
        font-size: 20px !important;
      }
      .logo-circle {
        width: 35px !important;
        height: 35px !important;
        font-size: 18px !important;
      }
      .lang-button {
        top: 10px !important;
        right: 10px !important;
        padding: 8px 18px !important;
        font-size: 14px !important;
      }
      .verification-card {
        padding: 30px 20px !important;
        margin: 10px !important;
        border-radius: 20px !important;
      }
      .success-icon, .error-icon, .loading-icon {
        width: 80px !important;
        height: 80px !important;
        font-size: 40px !important;
      }
    }
  `;

  const Confetti = () => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      confetti.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            background: `hsl(${Math.random() * 360}, 100%, 50%)`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      );
    }
    return <>{confetti}</>;
  };

  if (status === "loading") {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-bg" style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          padding: '20px',
          overflow: 'auto'
        }}>
          {/* Logo */}
          <div className="logo-container" style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div className="logo-circle" style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '28px',
              color: '#667eea'
            }}>
              Q
            </div>
            <span className="logo-text" style={{
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              FLASH_MIND
            </span>
          </div>

          <div className="fade-in verification-card">
            <div className="loading-icon">
              ⏳
            </div>

            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#000'
            }}>
              Vérification en cours
            </h2>

            <p style={{
              fontSize: '18px',
              color: '#6c757d',
              lineHeight: '1.6'
            }}>
              Nous vérifions votre email...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className={status === "success" ? "success-bg" : "error-bg"} style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '20px',
        overflow: 'auto'
      }}>
        {/* Confetti pour le succès */}
        {status === "success" && <Confetti />}

        {/* Logo */}
        <div className="logo-container" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div className="logo-circle" style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '28px',
            color: status === "success" ? '#28a745' : '#dc3545'
          }}>
            Q
          </div>
          <span className="logo-text" style={{
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            FLASH_MIND
          </span>
        </div>

        {/* Langue */}
        <div className="lang-button" style={{
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '50rem',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            🌐 FR
          </button>
        </div>

        <div className="fade-in verification-card">
          {status === "success" ? (
            <>
              <div className="success-icon bounce">
                ✅
              </div>

              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#000'
              }}>
                Félicitations !
              </h2>

              <p style={{
                fontSize: '18px',
                color: '#6c757d',
                marginBottom: '10px',
                lineHeight: '1.6'
              }}>
                {message}
              </p>

              <p style={{
                fontSize: '16px',
                color: '#28a745',
                fontWeight: '600',
                marginBottom: '30px'
              }}>
                Votre compte est maintenant activé
              </p>

              <button
                onClick={handleLoginRedirect}
                className="login-button"
              >
                Se connecter 🚀
              </button>
            </>
          ) : (
            <>
              <div className="error-icon">
                ❌
              </div>

              <h2 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#000'
              }}>
                Oups !
              </h2>

              <p style={{
                fontSize: '18px',
                color: '#6c757d',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                {message}
              </p>

              <p style={{
                fontSize: '14px',
                color: '#dc3545',
                fontStyle: 'italic',
                marginBottom: '30px'
              }}>
                Le lien de vérification peut être expiré ou invalide
              </p>

              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleLoginRedirect}
                  className="login-button"
                  style={{ marginTop: 0 }}
                >
                  Page de connexion
                </button>
                <button
                  onClick={handleResendVerification}
                  className="resend-button"
                  style={{ marginTop: 0 }}
                >
                  Renvoyer l'email
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          color: 'white',
          textAlign: 'center',
          fontSize: '14px',
          width: '100%',
          padding: '0 20px'
        }}>
          <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>
            © 2025 FlashMind. Tous droits réservés.
          </p>
          <div>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'underline',
              marginRight: '10px'
            }}>
              Politique de confidentialité
            </a>
            <span>|</span>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'underline',
              marginLeft: '10px'
            }}>
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}