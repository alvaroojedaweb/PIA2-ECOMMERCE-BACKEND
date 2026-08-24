
import { DataTypes } from'sequelize';
import sequelize from'../config/db.config.js';
 import OrdenCompra from'./ordenCompra.model.js';
import Producto from'./productos.model.js';

const ItemOrdenCompra = sequelize.define('ItemOrdenCompra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orden_compra_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orden_compra',
      key: 'orden_compra_id'
    }
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PRODUCTOS',
      key: 'PRODUCTOPKID'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'item_orden_compra',
  timestamps: true
});

// Relaciones
ItemOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'orden_compra_id' });
OrdenCompra.hasMany(ItemOrdenCompra, { foreignKey: 'orden_compra_id' });
ItemOrdenCompra.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(ItemOrdenCompra, { foreignKey: 'producto_id' });

export default ItemOrdenCompra;