import React, { useState } from "react";
import { Mail, Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signup" | "login";
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  phoneOrEmail: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  phoneOrEmail?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    phoneOrEmail: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === "signup") {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email";

      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "At least 8 characters";

      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      if (!formData.verificationCode)
        newErrors.verificationCode = "Verification code required";
    } else {
      if (!formData.phoneOrEmail)
        newErrors.phoneOrEmail = "Email or phone required";
      if (!formData.password) newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSendCode = () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Enter email to send code" }));
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setCodeSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log(`${mode} form submitted`, formData);
      setIsLoading(false);
    }, 1500);
  };

  const switchMode = () => {
    setMode(mode === "signup" ? "login" : "signup");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      phoneOrEmail: "",
    });
    setErrors({});
    setCodeSent(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "signup" ? "Try it for free" : "Welcome back"}
          </h2>
          <button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            {mode === "signup"
              ? "Only email registration is supported in your region."
              : "Login via email, Google, or +86 phone is supported."}
          </div>

          <div className="space-y-4">
            {mode === "signup" ? (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="# Code"
                      value={formData.verificationCode}
                      onChange={(e) =>
                        handleInputChange("verificationCode", e.target.value)
                      }
                      className={`flex-1 px-4 py-3 border rounded-lg ${
                        errors.verificationCode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      onClick={handleSendCode}
                      disabled={isLoading || codeSent}
                      className={`px-4 py-3 rounded-lg font-medium ${
                        codeSent
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {codeSent ? "Sent!" : "Send code"}
                    </button>
                  </div>
                  {errors.verificationCode && (
                    <p className="text-red-500 text-sm">
                      {errors.verificationCode}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Phone number / email address"
                    value={formData.phoneOrEmail}
                    onChange={(e) =>
                      handleInputChange("phoneOrEmail", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg ${
                      errors.phoneOrEmail ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phoneOrEmail && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneOrEmail}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </>
            )}

            <div className="text-sm text-gray-600">
              By {mode === "signup" ? "signing up" : "signing up or logging in"}
              , you agree to our{" "}
              <a href="#" className="text-blue-600 font-medium underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 font-medium underline">
                Privacy Policy
              </a>
              .
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : mode === "signup"
                ? "Sign up"
                : "Log in"}
            </button>
          </div>

          {/* Footer links */}
          <div className="mt-6 text-center text-sm">
            {mode === "login" ? (
              <>
                <span>Don’t have an account? </span>
                <button
                  onClick={switchMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <button
                  onClick={switchMode}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Page component (replaces demo UI)
const LoginSignupPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};

export default LoginSignupPage;
