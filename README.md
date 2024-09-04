# Proyecto Angular - OffsetSalidas

## Descripción

Este proyecto es una aplicación Angular diseñada para gestionar las operaciones de producción (OP). Incluye funcionalidades como búsqueda de OPs, visualización de detalles y más.

## Características

- Búsqueda de OPs con debounce para mejorar el rendimiento.
- Visualización de detalles de OPs en una tarjeta.
- Loader para indicar el estado de carga durante las búsquedas.
- Uso de Tailwind CSS para el diseño y estilo de la aplicación.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Ejecuta la aplicación:
    ```bash
    ng serve
    ```

5. Abre tu navegador y navega a `http://localhost:4200`.

## Uso

### Búsqueda de OPs

1. Ingresa un término de búsqueda en el campo de búsqueda.
2. La aplicación mostrará un loader mientras se realiza la búsqueda.
3. Los resultados de la búsqueda aparecerán en una lista desplegable.
4. Selecciona una OP de la lista para ver sus detalles.

### Visualización de Detalles

1. Al seleccionar una OP de la lista de resultados, se mostrará una tarjeta con los detalles de la OP.
2. Puedes cerrar la tarjeta de detalles haciendo clic en el botón de cerrar en la esquina superior derecha.

## Tecnologías Utilizadas

- [Angular](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.