const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sumary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthscore: {
        type: DataTypes.INTEGER,
        validate: {
          isEvent(value) {
            if (value < 0 || value > 100) {
              throw new Error(
                "Health Score esta fuera del rango de calificacion estimado."
              );
            }
          },
        },
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      idname: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.id}  ${this.name}`;
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
