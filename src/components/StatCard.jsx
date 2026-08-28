import React from 'react';
import { Card } from 'antd';

const StatCard = ({ title, value, icon, change, changeType = 'positive', color = '#6366f1' }) => {
  return (
    <Card
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid #e2e8f0',
        background: '#ffffff'
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{title}</span>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '4px 0 6px 0' }}>
            {value}
          </div>
          {change && (
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: changeType === 'positive' ? '#10b981' : '#ef4444',
              backgroundColor: changeType === 'positive' ? '#ecfdf5' : '#fef2f2',
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              {change}
            </span>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: `${color}15`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px'
        }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
