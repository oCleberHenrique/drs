from pathlib import Path
import os
from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-dev-key-dsr")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DEBUG", "0") == "1"

ALLOWED_HOSTS = [h.strip() for h in os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")]
if "*" in ALLOWED_HOSTS:
    ALLOWED_HOSTS = ["*"]  # Apenas em desenvolvimento
# Application definition
INSTALLED_APPS = [
    # Unfold Admin (Deve vir antes do django.contrib.admin)
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",

    # Django Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic", # Whitenoise em dev
    "django.contrib.staticfiles",
    
    # Third Party
    "rest_framework",
    "corsheaders",
    "django_filters",
    "ckeditor",
    
    # Local Apps
    "apps.website",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware", # Whitenoise logo após Security
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware", # CORS antes do Common
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases
import dj_database_url

DATABASES = {
    "default": dj_database_url.config(
        default=os.environ.get("DATABASE_URL", "postgres://dsr_user:dsr_password@db:5432/dsr_db"),
        conn_max_age=600, # Connection Pooling
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media Files
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# DRF Config
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny", # Fecharemos depois em prod
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,https://dsr.v4jasson.com.br"
).split(",")

# CSRF Configuration
CSRF_TRUSTED_ORIGINS = os.environ.get(
    "CSRF_TRUSTED_ORIGINS",
    "https://dsrpainel.v4jasson.com.br,https://dsr.v4jasson.com.br"
).split(",")

# Security Settings (Production)
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"

# CKEditor Configuration
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
        'toolbar_Custom': [
            ['Bold', 'Italic', 'Underline'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['RemoveFormat', 'Source']
        ],
    },
}

# Unfold Config (Painel Admin)
UNFOLD = {
    "SITE_TITLE": "DSR Admin",
    "SITE_HEADER": "DSR Painel",
    "SITE_URL": "/",
    "SITE_ICON": {
        "light": lambda request: static("admin/img/logo-dark.svg"),  # Substituir pelo logo do cliente depois
        "dark": lambda request: static("admin/img/logo-light.svg"),
    },
    "COLORS": {
        "primary": {
            "50": "250 245 255",
            "100": "243 232 255",
            "200": "233 213 255",
            "300": "216 180 254",
            "400": "192 132 252",
            "500": "168 85 247", # Roxo base (pode ajustar para a cor da marca DSR)
            "600": "147 51 234",
            "700": "126 34 206",
            "800": "107 33 168",
            "900": "88 28 135",
            "950": "59 7 100",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            # -----------------------------------------------------------------
            # HOME - Alterações das seções da página inicial
            # -----------------------------------------------------------------
            {
                "title": _("Home"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Banner Principal"),
                        "icon": "image",
                        "link": reverse_lazy("admin:website_herohome_changelist"),
                    },
                    {
                        "title": _("Seção Quem Somos"),
                        "icon": "groups",
                        "link": reverse_lazy("admin:website_quemsomos_changelist"),
                    },
                    {
                        "title": _("Diferenciais"),
                        "icon": "star",
                        "link": reverse_lazy("admin:website_diferencial_changelist"),
                    },
                    {
                        "title": _("Seção Atuação"),
                        "icon": "gavel",
                        "link": reverse_lazy("admin:website_homeatuacao_changelist"),
                    },
                    {
                        "title": _("Seção História"),
                        "icon": "history",
                        "link": reverse_lazy("admin:website_historia_changelist"),
                    },
                    {
                        "title": _("Seção Equipe"),
                        "icon": "people",
                        "link": reverse_lazy("admin:website_homeequipe_changelist"),
                    },
                    {
                        "title": _("Seção Blog"),
                        "icon": "article",
                        "link": reverse_lazy("admin:website_homeblog_changelist"),
                    },
                    {
                        "title": _("Seção Contato"),
                        "icon": "contact_mail",
                        "link": reverse_lazy("admin:website_homecontato_changelist"),
                    },
                ],
            },
            # -----------------------------------------------------------------
            # PÁGINAS INTERNAS - Atuações, Equipe e Blog
            # -----------------------------------------------------------------
            {
                "title": _("Atuações"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Áreas de Atuação"),
                        "icon": "folder",
                        "link": reverse_lazy("admin:website_atuacao_changelist"),
                    },
                ],
            },
            {
                "title": _("Equipe"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Membros da Equipe"),
                        "icon": "person",
                        "link": reverse_lazy("admin:website_membroequipe_changelist"),
                    },
                ],
            },
            {
                "title": _("Blog"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Artigos"),
                        "icon": "description",
                        "link": reverse_lazy("admin:website_blogpost_changelist"),
                    },
                ],
            },
            # -----------------------------------------------------------------
            # PÁGINAS ÚNICAS - Quem Somos interna, etc.
            # -----------------------------------------------------------------
            {
                "title": _("Páginas Únicas"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Quem Somos (Interna)"),
                        "icon": "info",
                        "link": reverse_lazy("admin:website_paginaquemsomos_changelist"),
                    },
                ],
            },
            # -----------------------------------------------------------------
            # CONTATO - Mensagens recebidas
            # -----------------------------------------------------------------
            {
                "title": _("Contato"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Mensagens Recebidas"),
                        "icon": "inbox",
                        "link": reverse_lazy("admin:website_contato_changelist"),
                    },
                ],
            },
            # -----------------------------------------------------------------
            # SISTEMA - Usuários e grupos
            # -----------------------------------------------------------------
            {
                "title": _("Sistema"),
                "separator": True,
                "collapsible": True,
                "items": [
                    {
                        "title": _("Usuários"),
                        "icon": "person",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": _("Grupos"),
                        "icon": "groups",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                ],
            },
        ],
    },
}