insert into "shapes" ("shapeName", "shapeDescription")
values ('True Twin', 'A true twin snowboard shape is ideal for riders who want to ride switch. The nose and tail are identical and the flex distributes throughout the entirety of the board. True twins are symmetrical.'),
       ('Directional', 'Setback stance with a longer nose that easily floats above powder and the stiff tail maintains stability at high speeds. This shape is ideal for freeride and powder conditions.'),
       ('Asymmetrical Twin', 'Balance through asymmetry. This shape features asymmetrical sidecuts and contact lengths. It has a deeper sidecut on the heel side, as well as longer toe side contact and shorter heel side contact for finesse and power.');

insert into "profileTypes" ("profileName", "profileDescription")
values ('Original Banana', 'Original Banana Technology is easy and awesome thanks to mild rocker between your feet combined with mild cambers to the tips and tails.'),
       ('C2', 'Perfectly balanced all terrain contour. Mild rocker between your feet with powerful cambers to the tips and tails. Enough power pop and precision to technically hit the biggest wedges, enough float and freedom to rip the gnarliest AK pow lines. Carves the resort, plays in the park, and slays powder.'),
       ('C2x', 'A shorter, more aggressive banana rocker combined with cambers that sit more underfoot. Extra solid tip and tail pressure for power, pop, precision and end-to-end stability combined with a medium amount of pressure between your feet for carving, edge hold on ice and float in pow.'),
       ('C3', 'Aggressive dominant camber zones out to the contacts combined with mild rocker between your feet. Subtle Banana rocker gives freestyle freedom with maximum end-to-end stability for big, high-speed lines. For aggressive, skilled riders.');

insert into "edgeTech" ("edgeTechName", "edgeTechDescription")
values ('Magne-Traction®', '7 strategically located and sized edge serrations provide unreal edge hold and control in all conditions.');

insert into "snowboards" ("name", "price", "imageUrl", "description", "profileId", "flex", "shapeId", "edgeTechId", "abilityLevel", "terrain")
values ('Roxy XOXO', '49999', 'https://images.evo.com/imgp/700/220847/914108/roxy-xoxo-pro-c3-snowboard-women-s-2023-.jpg', 'The Roxy XOXO Pro C3 Snowboard is Chloe Kim''s go-to when she''s hankering for another gold medal to add to the collection. It''s a poppy, playful freestyle board with enough sass to keep things interesting when you explore outside the terrain park. A newly updated Light Hearted Core is paired with Roxy''s energetic C3 camber profile and grippy Magne-Traction® edges for dependable carves in a wide array of snow conditions, allowing you to leave your mark on the mountain no matter what. See you on the podium, XOXO!',
        '4', 'Medium', '1', '1', 'Intermediate-Advanced', '["Freestyle", "All-Mountain"]'),
       ('GNU Velvet', '52999', 'https://images.evo.com/imgp/700/220837/911103/gnu-asym-velvet-c2-snowboard-women-s-2023-.jpg', 'The GNU Asym Velvet C2 Snowboard is as smooth as its namesake and a twice as stylish. This asymmetrical board is built to carve with exceptional ease while providing plenty of pop for freestyle maneuvers around the mountain. Its a joy to arc down the corduroy, is super lively through the trees, and feels both springy and planted when hitting jump lines in the park. As with all Mervin boards, the Velvet is handmade in the US with eco-friendly processes and materials.',
        '2', 'Medium', '3', '1', 'Intermediate-Advanced', '["Freestyle", "All-Mountain"]'),
       ('Roxy Dawn', '34999', 'https://images.evo.com/imgp/700/220849/914111/roxy-dawn-snowboard-women-s-2023-.jpg', 'Looking for a new BFF? Preferably one who enjoys early morning carpool karaoke sessions on the way to go hang out in snow-capped mountains? The Roxy Dawn Snowboard is your ride or die, combining an easygoing personality with an insatiable thirst for adventure. This twin shape has an Easy-Rise rocker profile and a soft, forgiving flex that''s ideal for beginner riders on the up.',
        '1', 'Soft', '1', '1', 'Beginner-Intermediate', '["All-Mountain"]'),
       ('GNU Free Spirit', '59999', 'https://images.evo.com/imgp/700/220839/899326/gnu-free-spirit-c3-snowboard-women-s-2023-.jpg', 'When the snow stacks up and it''s time for Jamie Anderson to leave the park for the big mountains, she reaches for the GNU Free Spirit C3 Snowboard. This big mountain powder board is loaded with float, dialed for response, and ready to crush the lines of your dreams. It''s big spoon nose is unsinkable, whether surfing down powder bowls or dropping pillow lines, and it''s backed up by a stiff, reactive core and aggressive camber profile that will keep you in the driver''s seat no matter how hard you''re ripping, as well as providing plenty of pop for all the side hits and jibs you''re sure to find once the powder is tracked out.',
       '4', 'Firm', '2', '1', 'Advanced-Expert', '["Freeride", "Powder"]'),
       ('GNU B-NICE', '45999', 'https://images.evo.com/imgp/700/220836/899325/gnu-b-nice-btx-snowboard-women-s-2023-.jpg', 'Learning new things is hard. But it''s a lot better if you have a good teacher. Someone that will be patient, be encouraging, and most of all be nice. The GNU B-Nice BTX Snowboard is just that teacher. It''s a friendly, catch free all-mountain freestyle board that will take you from day 1 to pro in no time, with nothing but kindness and stoke along the way.',
       '1', 'Soft-Medium', '1', '1', 'Beginner-Intermediate', '["Freestyle", "All-Mountain"]'),
       ('Roxy Raina', '39999', 'https://images.evo.com/imgp/700/220850/914109/roxy-raina-snowboard-women-s-2023-.jpg', 'The Roxy Raina C2 Snowboard is custom made for riders progressing from zero to shred. Combining top shelf features like C2 Contour Technology and Magne-Traction® edges with a soft, easygoing flex, the Raina is a beginner friendly package that won''t hold you back when you slide into more challenging terrain.',
       '2', 'Soft-Medium', '1', '1', 'Beginner-Intermediate', '["All-Mountain"]'),
       ('GNU Gloss', '42999', 'https://images.evo.com/imgp/700/220835/899323/gnu-gloss-c2e-snowboard-women-s-2023-.jpg', 'The GNU Gloss C2E Snowboard is what snowboarding is all about. Sure it uses some pretty fancy tech like Magne-Traction edges and a C2e rocker profile, and it comes with a stylishly witchy design, but at it''s core this board is all about simple pleasures. It''s a blunted freestyle twin that''s built for glory day in the park and dream days hot lapping with your friends. It''s poppy, playful, approachable, and fast. It''s simple snowboarding, done right.',
       '2', 'Medium', '1', '1', 'Intermediate-Advanced', '["Freestyle"]');

insert into "sizes" ("productId", "size")
values ('1', '145'),
       ('1', '149'),
       ('2', '139'),
       ('2', '143'),
       ('2', '147'),
       ('2', '150'),
       ('3', '138'),
       ('3', '142'),
       ('3', '146'),
       ('4', '148'),
       ('4', '153'),
       ('5', '139'),
       ('5', '142'),
       ('5', '149'),
       ('5', '151'),
       ('5', '154'),
       ('6', '139'),
       ('6', '143'),
       ('6', '147'),
       ('6', '151'),
       ('7', '136'),
       ('7', '140'),
       ('7', '144'),
       ('7', '148');
