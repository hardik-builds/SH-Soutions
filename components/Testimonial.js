// export default function Testimonial({ name, role, content, avatar }) {
//   return (
//     <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
//         <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
//           {avatar ? (
//             <img src={avatar} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
//           ) : (
//             <span style={{ color: '#6B7280', fontWeight: '600' }}>
//               {name.split(' ').map(n => n[0]).join('')}
//             </span>
//           )}
//         </div>
//         <div>
//           <h4 style={{ fontWeight: 'bold' }}>{name}</h4>
//           <p style={{ color: '#6B7280', fontSize: '14px' }}>{role}</p>
//         </div>
//       </div>
//       <p style={{ color: '#4B5563', fontStyle: 'italic' }}>"{content}"</p>
//     </div>
//   );
// }